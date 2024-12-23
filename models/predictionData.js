const mongoose = require("mongoose");

const predictionSchema = new mongoose.Schema({
  weekStartDate: {
    type: String,
    required: true,
    unique: true,
  },
  nextWeekPredictions: [
    {
      date: { type: String, required: true },
      predicted_units: { type: Number, required: true },
    },
  ],
  nextMonthPrediction: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Prediction", predictionSchema);
