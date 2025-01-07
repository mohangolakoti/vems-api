const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const { format, subDays, startOfDay, endOfDay, addSeconds,addDays } = require('date-fns');
const fs = require('fs');
const dotEnv = require('dotenv');
dotEnv.config();
const app = express();
app.use(cors());
const path = require('path')
app.use(bodyParser.json());
const { PythonShell } = require('python-shell');
const { spawn } = require("child_process");
const schedule = require("node-schedule");
const Prediction = require("../models/predictionData");
const EnergyData = require('../models/energyData');

const sensorData = async (req, res) => {
    try {
        const latestData = await EnergyData.findOne().sort({ timestamp: -1 });
        res.json(latestData);
    } catch (error) {
        res.status(500).json({ error: "Error fetching latest sensor data" });
    }
};

const energyConsumption = async (req, res) => {
    try {
        const dates = Array.from({ length: 7 }, (_, i) =>
            subDays(new Date(), 6 - i)
        );

        // Array to store energy data for each day
        const energyData = await Promise.all(
            dates.map(async (date) => {
                const start = startOfDay(date);
                const end = endOfDay(date);

                // Find the most recent record for this day
                const record = await EnergyData.findOne({
                    timestamp: { $gte: start, $lte: end },
                })
                    .sort({ timestamp: -1 })
                    .select(
                        "TotalNet_KWH_meter_70 energy_consumption_meter_69 energy_consumption_meter_41 energy_consumption_meter_40 timestamp"
                    );

                if (record) {
                    return {
                        date: format(record.timestamp, "yyyy-MM-dd"),
                        energy:
                            (record.energy_consumption_meter_70 || 0) +
                            (record.energy_consumption_meter_69 || 0) +
                            (record.energy_consumption_meter_41 || 0) +
                            (record.energy_consumption_meter_40 || 0),
                    };
                } else {
                    // No record found for this date
                    return { date: format(date, "yyyy-MM-dd"), energy: 0 };
                }
            })
        );

        res.status(200).json(energyData);
    } catch (error) {
        console.error("Error fetching energy values:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


const realTimeGraph = async (req, res) => {
    const today = new Date();
    const start = startOfDay(today);
    const end = today;

    try {
        const data = await EnergyData.find({
            timestamp: { $gte: start, $lte: end }
        }).sort({ timestamp: 1 });

        res.json(data);
    } catch (error) {
        console.error('Error fetching power data:', error);
        res.status(500).send('Error fetching power data');
    }
};

const dailyWiseGraph = async (req, res) => {
    const date = req.params.date;

    // Convert to IST by adding 5 hours 30 minutes (19800 seconds) to the start and end of the day
    const startUTC = startOfDay(new Date(date));
    const endUTC = endOfDay(new Date(date));

    try {
        const data = await EnergyData.find({
            timestamp: { $gte: startUTC, $lte: endUTC }
        }).sort({ timestamp: 1 });

        res.json(data);
    } catch (error) {
        console.error('Error fetching power data:', error);
        res.status(500).send('Error fetching power data');
    }
};


const prevDayEnergy = async (req, res) => {
    try {
        const yesterday = subDays(new Date(), 1);
        const today = new Date();

        const previousDayRecord = await EnergyData.findOne({
            timestamp: {
                $gte: startOfDay(yesterday),
                $lte: endOfDay(yesterday)
            }
        }).sort({ timestamp: -1 });

        const todayFirstRecord = await EnergyData.findOne({
            timestamp: { $gte: startOfDay(today) }
        }).sort({ timestamp: 1 });

        let initialEnergyValues = {
            meter_70: null,
            meter_40: null,
            meter_69: null,
            meter_41: null,
        };

        if (previousDayRecord) {
            initialEnergyValues = {
                meter_70: previousDayRecord.TotalNet_KWH_meter_70,
                meter_40: previousDayRecord.TotalNet_KWH_meter_40,
                meter_69: previousDayRecord.TotalNet_KWH_meter_69,
                meter_41: previousDayRecord.TotalNet_KWH_meter_41,
            };
        } else if (todayFirstRecord) {
            initialEnergyValues = {
                meter_70: todayFirstRecord.TotalNet_KWH_meter_70,
                meter_40: todayFirstRecord.TotalNet_KWH_meter_40,
                meter_69: todayFirstRecord.TotalNet_KWH_meter_69,
                meter_41: todayFirstRecord.TotalNet_KWH_meter_41,
            };
        }

        res.status(200).json({ initialEnergyValues });
    } catch (error) {
        console.error("Error fetching previous day's energy values:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getHighestKva = async (req, res) => {
    try {
        const today = new Date();

        const highestKvaToday = await EnergyData.aggregate([
            {
                $match: {
                    timestamp: {
                        $gte: startOfDay(today),
                        $lte: today
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    highest_kva_today: { $max: { $add: ["$Total_KVA_meter_70", "$Total_KVA_meter_40", "$Total_KVA_meter_69"] } }
                }
            }
        ]);

        const highestKvaMonth = await EnergyData.aggregate([
            {
                $match: {
                    timestamp: {
                        $gte: startOfDay(new Date(today.getFullYear(), today.getMonth(), 1)),
                        $lte: today
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    highest_kva_month: { $max: { $add: ["$Total_KVA_meter_70", "$Total_KVA_meter_40", "$Total_KVA_meter_69"] } }
                }
            }
        ]);

        res.status(200).json({
            highestKvaToday: highestKvaToday[0]?.highest_kva_today || 0,
            highestKvaMonth: highestKvaMonth[0]?.highest_kva_month || 0,
        });
    } catch (error) {
        console.error('Error fetching highest KVA values:', error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const sensorDataByDate = async (req, res) => {
    const { date } = req.params;

    try {
        const data = await EnergyData.find({
            timestamp: {
                $gte: startOfDay(new Date(date)),
                $lte: endOfDay(new Date(date))
            }
        });

        if (data.length === 0) {
            return res.status(404).json({ message: "No data found for the selected date." });
        }

        res.json(data);
    } catch (error) {
        console.error('Error fetching sensor data:', error);
        res.status(500).json({ error: "Error fetching sensor data" });
    }
};

const getMonthlyEnergyConsumption = async (req, res) => {
    try {
        // Get the current date
        const currentDate = new Date();

        // Calculate the first day of the current month
        const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

        // Aggregate the sum of daily last stored values for each meter in the current month
        const monthlyData = await EnergyData.aggregate([
            {
                $match: {
                    timestamp: { $gte: startOfMonth }, // Match data from the start of the current month
                },
            },
            {
                $addFields: {
                    date: {
                        $dateToString: { format: "%Y-%m-%d", date: "$timestamp" }, // Extract the date part
                    },
                },
            },
            {
                $sort: { timestamp: -1 }, // Sort by timestamp in descending order to get the last value first
            },
            {
                $group: {
                    _id: { date: "$date" }, // Group by date
                    lastEnergyConsumptionMeter70: { $first: "$energy_consumption_meter_70" }, // Last value for meter 70
                    lastEnergyConsumptionMeter69: { $first: "$energy_consumption_meter_69" }, // Last value for meter 69
                    lastEnergyConsumptionMeter40: { $first: "$energy_consumption_meter_40" }, // Last value for meter 40
                },
            },
            {
                $group: {
                    _id: null, // Group everything to calculate the total sum
                    totalEnergyConsumptionMeter70: { $sum: "$lastEnergyConsumptionMeter70" }, // Sum last values for meter 70
                    totalEnergyConsumptionMeter69: { $sum: "$lastEnergyConsumptionMeter69" }, // Sum last values for meter 69
                    totalEnergyConsumptionMeter40: { $sum: "$lastEnergyConsumptionMeter40" }, // Sum last values for meter 40
                },
            },
        ]);

        if (monthlyData.length === 0) {
            return res.status(404).json({ error: "No data found for the current month" });
        }

        // Calculate the overall total energy consumption for the month
        const totalEnergyConsumption =
            monthlyData[0].totalEnergyConsumptionMeter70 +
            monthlyData[0].totalEnergyConsumptionMeter69 +
            monthlyData[0].totalEnergyConsumptionMeter40;

        // Respond with the total energy consumption for the current month
        const response = {
            totalEnergyConsumptionMeter70: monthlyData[0].totalEnergyConsumptionMeter70,
            totalEnergyConsumptionMeter69: monthlyData[0].totalEnergyConsumptionMeter69,
            totalEnergyConsumptionMeter40: monthlyData[0].totalEnergyConsumptionMeter40,
            totalEnergyConsumption,
        };

        res.json(response);
    } catch (error) {
        console.error("Error fetching monthly energy consumption data:", error);
        res.status(500).json({ error: "Error fetching monthly energy consumption data" });
    }
};

const runPredictionScript = async (currentDate, formattedWeekStartDate) => {
    return new Promise((resolve, reject) => {
      const pythonProcess = spawn("python", ["./controllers/predict.py", currentDate]);
      let scriptOutput = "";
  
      pythonProcess.stdout.on("data", (data) => {
        scriptOutput += data.toString();
      });
  
      pythonProcess.stderr.on("data", (data) => {
        console.error("Python script error:", data.toString());
      });
  
      pythonProcess.on("close", (code) => {
        if (code !== 0) {
          return reject(new Error("Python script execution failed"));
        }
  
        try {
          const predictions = JSON.parse(scriptOutput.trim());
          if (!predictions?.next_week_predictions || predictions.next_month_prediction === undefined) {
            return reject(new Error("Invalid predictions format"));
          }
  
          resolve(predictions);
        } catch (error) {
          reject(error);
        }
      });
    });
  };
  
  const predictions = async (req, res) => {
    const currentDate = new Date().toISOString().split("T")[0];
    const weekStartDate = new Date();
    weekStartDate.setDate(weekStartDate.getDate() - (weekStartDate.getDay() || 7)); // Get start of the current week
    const formattedWeekStartDate = weekStartDate.toISOString().split("T")[0];
  
    try {
      // Check for existing predictions
      let existingPrediction = await Prediction.findOne({ weekStartDate: formattedWeekStartDate });
  
      if (!existingPrediction) {
        console.log("No existing predictions found. Generating new predictions.");
        const predictions = await runPredictionScript(currentDate, formattedWeekStartDate);
  
        // Save new predictions to the database
        const newPrediction = new Prediction({
          weekStartDate: formattedWeekStartDate,
          nextWeekPredictions: predictions.next_week_predictions,
          nextMonthPrediction: predictions.next_month_prediction,
        });
        existingPrediction = await newPrediction.save();
      }
  
      const sanitizedPredictions = existingPrediction.nextWeekPredictions.map(({ date, predicted_units }) => ({
        date,
        predicted_units,
      }));
  
      return res.json({
        success: true,
        predictions: sanitizedPredictions,
        nextMonthPrediction: existingPrediction.nextMonthPrediction,
      });
    } catch (error) {
      console.error("Error processing predictions:", error);
      return res.status(500).json({ error: "Error processing predictions" });
    }
  };
  
  // Schedule the prediction script to run daily
  schedule.scheduleJob("0 0 * * *", async () => {
    const currentDate = new Date().toISOString().split("T")[0];
    const weekStartDate = new Date();
    weekStartDate.setDate(weekStartDate.getDate() - (weekStartDate.getDay() || 7)); // Start of the current week
    const formattedWeekStartDate = weekStartDate.toISOString().split("T")[0];
  
    try {
      console.log("Running scheduled prediction script...");
      const existingPrediction = await Prediction.findOne({ weekStartDate: formattedWeekStartDate });
  
      if (!existingPrediction) {
        const predictions = await runPredictionScript(currentDate, formattedWeekStartDate);
  
        // Save new predictions
        const newPrediction = new Prediction({
          weekStartDate: formattedWeekStartDate,
          nextMonthPrediction: predictions.next_month_prediction,
        });
  
        await newPrediction.save();
        console.log("New predictions saved successfully.");
      } else {
        console.log("Predictions for this week are already up-to-date.");
      }
    } catch (error) {
      console.error("Error during scheduled prediction script execution:", error);
    }
  });
  
  
  
  
const getLatestPrediction = async (req, res) => {
    try {
      // Fetch the latest prediction by sorting the collection based on the `createdAt` field
      const latestPrediction = await Prediction.findOne().sort({ createdAt: -1 });
  
      if (!latestPrediction) {
        return res.status(404).json({
          success: false,
          message: "No predictions found.",
        });
      }
  
      return res.json({
        success: true,
        latestPrediction,
      });
    } catch (error) {
      console.error("Error fetching the latest prediction:", error);
      return res.status(500).json({
        success: false,
        message: "Error fetching the latest prediction.",
        error: error.message,
      });
    }
  };  
  

module.exports = { sensorData, realTimeGraph, dailyWiseGraph, prevDayEnergy, energyConsumption, getHighestKva, sensorDataByDate, getMonthlyEnergyConsumption, predictions, getLatestPrediction };
