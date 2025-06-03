const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotEnv = require("dotenv");
const axios = require("axios");
const { format } = require("date-fns");
const app = express();
const sensorDataRoutes = require("./routes/energydataRoute");
const storageRoutes = require("./routes/storageRoute");
const EnergyData = require("./models/energyData");
const EnergySummary = require("./models/energySummary");

dotEnv.config();

app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT || 4000;

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.use("/api", sensorDataRoutes);
app.use("/api1", storageRoutes);


let initialEnergyValue = null;
let firstStoredEnergyValue = null;
let isFirstDataStoredToday = false;

// Function to initialize the energy value from previous day's data
async function initializeInitialEnergyValue() {
  try {
    console.log("Initializing initial energy value...");

    const yesterday = format(new Date(Date.now() - 86400000), 'yyyy-MM-dd');
    const today = format(new Date(), 'yyyy-MM-dd');

    // Fetch previous day's last data
    const previousDayData = await EnergyData.findOne({
      timestamp: {
        $gte: new Date(yesterday),
        $lt: new Date(today)
      }
    }).sort({ timestamp: -1 });

    if (previousDayData) {
      initialEnergyValue = {
        meter6: previousDayData.TotalNet_KWH_meter_6,
        meter108: previousDayData.TotalNet_KWH_meter_108,
        meter201: previousDayData.TotalNet_KWH_meter_201,
        meter227: previousDayData.TotalNet_KWH_meter_227,
      };
      console.log("Initial energy value stored from previous day:", initialEnergyValue);
    } else {
      console.log("No data found for the previous day. Fetching today's first record.");
      const todayFirstRecord = await EnergyData.findOne({
        timestamp: {
          $gte: new Date(today)
        }
      }).sort({ timestamp: 1 });

      if (todayFirstRecord) {
        initialEnergyValue = {
          meter6: todayFirstRecord.TotalNet_KWH_meter_6,
          meter108: todayFirstRecord.TotalNet_KWH_meter_108,
          meter201: todayFirstRecord.TotalNet_KWH_meter_201,
          meter227: todayFirstRecord.TotalNet_KWH_meter_227,
        };
        console.log("Initial energy value set to today's first record:", initialEnergyValue);
      } else {
        console.log("No data found for today yet.");
      }
    }
  } catch (error) {
    console.error("Error initializing initial energy value:", error);
  }
}

// Function to fetch data from the API and store it in the database
async function fetchDataAndStore() {
  try {
    console.log("Fetching and storing sensor data...");
    const response = await axios.get("https://gfiotsolutions.com/api/sensordata");
    const newData = response.data[0];

    // If no initial energy value has been set, set it to the current values
    if (initialEnergyValue === null) {
      initialEnergyValue = {
        meter6: newData.TotalNet_KWH_meter_6,
        meter108: newData.TotalNet_KWH_meter_108,
        meter201: newData.TotalNet_KWH_meter_201,
        meter227: newData.TotalNet_KWH_meter_227,
      };
      console.log("Setting initial energy value to the current value:", initialEnergyValue);
    }

    const energyConsumption = {
      meter6: newData.TotalNet_KWH_meter_6 - initialEnergyValue.meter6,
      meter108: newData.TotalNet_KWH_meter_108 - initialEnergyValue.meter108,
      meter201: newData.TotalNet_KWH_meter_201 - initialEnergyValue.meter201,
      meter227: newData.TotalNet_KWH_meter_227 - initialEnergyValue.meter227,
    };

    // Create a new record for energy data
    const newEnergyData = new EnergyData({
      timestamp: new Date(),
      Total_KW_meter_6: newData.Total_KW_meter_6,
      TotalNet_KWH_meter_6: newData.TotalNet_KWH_meter_6,
      Total_KVA_meter_6: newData.Total_KVA_meter_6,
      Avg_PF_meter_6: newData.Avg_PF_meter_6,
      TotalNet_KVAH_meter_6: newData.TotalNet_KVAH_meter_6,

      Total_KW_meter_108: newData.Total_KW_meter_108,
      TotalNet_KWH_meter_108: newData.TotalNet_KWH_meter_108,
      Total_KVA_meter_108: newData.Total_KVA_meter_108,
      Avg_PF_meter_108: newData.Avg_PF_meter_108,
      TotalNet_KVAH_meter_108: newData.TotalNet_KVAH_meter_108,

      Total_KW_meter_201: newData.Total_KW_meter_201,
      TotalNet_KWH_meter_201: newData.TotalNet_KWH_meter_201,
      Total_KVA_meter_201: newData.Total_KVA_meter_201,
      Avg_PF_meter_201: newData.Avg_PF_meter_201,
      TotalNet_KVAH_meter_201: newData.TotalNet_KVAH_meter_201,

      Total_KW_meter_227: newData.Total_KW_meter_227,
      TotalNet_KWH_meter_227: newData.TotalNet_KWH_meter_227,
      Total_KVA_meter_227: newData.Total_KVA_meter_227,
      Avg_PF_meter_227: newData.Avg_PF_meter_227,
      TotalNet_KVAH_meter_227: newData.TotalNet_KVAH_meter_227,

      energy_consumption_meter_6: energyConsumption.meter6,
      energy_consumption_meter_108: energyConsumption.meter108,
      energy_consumption_meter_201: energyConsumption.meter201,
      energy_consumption_meter_227: energyConsumption.meter227
    });

    await newEnergyData.save();
    console.log("Sensor data stored successfully:", newEnergyData);

    // Store the first energy value for today
    if (!isFirstDataStoredToday) {
      firstStoredEnergyValue = {
        meter6: newData.TotalNet_KWH_meter_6,
        meter108: newData.TotalNet_KWH_meter_108,
        meter201: newData.TotalNet_KWH_meter_201,
        meter227: newData.TotalNet_KWH_meter_227,
      };
      isFirstDataStoredToday = true;
      console.log("First stored energy value for today:", firstStoredEnergyValue);
    }
  } catch (error) {
    console.error("Error fetching and storing sensor data:", error);
  }
}

async function storeEnergySummary() {
  const response = await axios.get("https://gfiotsolutions.com/api/sensordata");
  const newData = response.data[0];

  const sumKVA = parseFloat(newData.Total_KVA_meter_6) +
                 parseFloat(newData.Total_KVA_meter_108) +
                 parseFloat(newData.Total_KVA_meter_201);

  const sumPower = parseFloat(newData.Total_KW_meter_6) +
                   parseFloat(newData.Total_KW_meter_108) +
                   parseFloat(newData.Total_KW_meter_201);

  const summary = new EnergySummary({ sumKVA, sumPower });

  try {
    await summary.save();
    console.log('Energy summary saved to database.');
  } catch (err) {
    console.error('Error saving energy summary:', err);
  }
}

// Set intervals to initialize and fetch data every 10 minutes
setInterval(initializeInitialEnergyValue, 10 * 60000);
setInterval(fetchDataAndStore, 10 * 60000);
setInterval(storeEnergySummary, 1 * 60000);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
