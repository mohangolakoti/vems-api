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
                        "TotalNet_KWH_meter_6 energy_consumption_meter_108 energy_consumption_meter_201 energy_consumption_meter_227 timestamp"
                    );

                if (record) {
                    return {
                        date: format(record.timestamp, "yyyy-MM-dd"),
                        energy:
                            (record.energy_consumption_meter_6 || 0) +
                            (record.energy_consumption_meter_108 || 0) +
                            (record.energy_consumption_meter_201 || 0) +
                            (record.energy_consumption_meter_227 || 0),
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
            meter_6: null,
            meter_227: null,
            meter_108: null,
            meter_201: null,
        };

        if (previousDayRecord) {
            initialEnergyValues = {
                meter_6: previousDayRecord.TotalNet_KWH_meter_6,
                meter_227: previousDayRecord.TotalNet_KWH_meter_227,
                meter_108: previousDayRecord.TotalNet_KWH_meter_108,
                meter_201: previousDayRecord.TotalNet_KWH_meter_201,
            };
        } else if (todayFirstRecord) {
            initialEnergyValues = {
                meter_6: todayFirstRecord.TotalNet_KWH_meter_6,
                meter_227: todayFirstRecord.TotalNet_KWH_meter_227,
                meter_108: todayFirstRecord.TotalNet_KWH_meter_108,
                meter_201: todayFirstRecord.TotalNet_KWH_meter_201,
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
                    highest_kva_today: { $max: { $add: ["$Total_KVA_meter_6", "$Total_KVA_meter_201", "$Total_KVA_meter_108"] } }
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
                    highest_kva_month: { $max: { $add: ["$Total_KVA_meter_6", "$Total_KVA_meter_201", "$Total_KVA_meter_108"] } }
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
                    lastEnergyConsumptionMeter6: { $first: "$energy_consumption_meter_6" }, // Last value for meter 6
                    lastEnergyConsumptionMeter108: { $first: "$energy_consumption_meter_108" }, // Last value for meter 108
                    lastEnergyConsumptionMeter201: { $first: "$energy_consumption_meter_201" }, // Last value for meter 201
                },
            },
            {
                $group: {
                    _id: null, // Group everything to calculate the total sum
                    totalEnergyConsumptionMeter6: { $sum: "$lastEnergyConsumptionMeter6" }, // Sum last values for meter 6
                    totalEnergyConsumptionMeter108: { $sum: "$lastEnergyConsumptionMeter108" }, // Sum last values for meter 108
                    totalEnergyConsumptionMeter201: { $sum: "$lastEnergyConsumptionMeter201" }, // Sum last values for meter 201
                },
            },
        ]);

        if (monthlyData.length === 0) {
            return res.status(404).json({ error: "No data found for the current month" });
        }

        // Calculate the overall total energy consumption for the month
        const totalEnergyConsumption =
            monthlyData[0].totalEnergyConsumptionMeter6 +
            monthlyData[0].totalEnergyConsumptionMeter108 +
            monthlyData[0].totalEnergyConsumptionMeter201;

        // Respond with the total energy consumption for the current month
        const response = {
            totalEnergyConsumptionMeter6: monthlyData[0].totalEnergyConsumptionMeter6,
            totalEnergyConsumptionMeter108: monthlyData[0].totalEnergyConsumptionMeter108,
            totalEnergyConsumptionMeter201: monthlyData[0].totalEnergyConsumptionMeter201,
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
