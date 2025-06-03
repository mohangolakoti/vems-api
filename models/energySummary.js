// models/EnergySummary.js
const mongoose = require('mongoose');

const energySummarySchema = new mongoose.Schema({
  sumKVA: Number,
  sumPower: Number,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('EnergySummary', energySummarySchema);
