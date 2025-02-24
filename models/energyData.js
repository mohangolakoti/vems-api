const mongoose = require('mongoose');

const energySchema = new mongoose.Schema({
    timestamp: {
        type: Date,
        required: true
    },
    // Meter 70  pcc1
    Total_KW_meter_6: { type: Number, required: true, default: 0.0 },
    TotalNet_KWH_meter_6: { type: Number, required: true, default: 0.0 },
    Total_KVA_meter_6: { type: Number, required: true, default: 0.0 },
    Avg_PF_meter_6: { type: Number, required: true, default: 0.0 },
    TotalNet_KVAH_meter_6: { type: Number, required: true, default: 0.0 },
    energy_consumption_meter_6: { type: Number, required: true, default: 0.0 },

    // Meter 108 pcc2
    Total_KW_meter_108: { type: Number, required: true, default: 0.0 },
    TotalNet_KWH_meter_108: { type: Number, required: true, default: 0.0 },
    Total_KVA_meter_108: { type: Number, required: true, default: 0.0 },
    Avg_PF_meter_108: { type: Number, required: true, default: 0.0 },
    TotalNet_KVAH_meter_108: { type: Number, required: true, default: 0.0 },
    energy_consumption_meter_108: { type: Number, required: true, default: 0.0 },

    // Meter 201 pcc3
    Total_KW_meter_201: { type: Number, required: true, default: 0.0 },
    TotalNet_KWH_meter_201: { type: Number, required: true, default: 0.0 },
    Total_KVA_meter_201: { type: Number, required: true, default: 0.0 },
    Avg_PF_meter_201: { type: Number, required: true, default: 0.0 },
    TotalNet_KVAH_meter_201: { type: Number, required: true, default: 0.0 },
    energy_consumption_meter_201: { type: Number, required: true, default: 0.0 },

    // Meter 227 pcc3a
    Total_KW_meter_227: { type: Number, required: true, default: 0.0 },
    TotalNet_KWH_meter_227: { type: Number, required: true, default: 0.0 },
    Total_KVA_meter_227: { type: Number, required: true, default: 0.0 },
    Avg_PF_meter_227: { type: Number, required: true, default: 0.0 },
    TotalNet_KVAH_meter_227: { type: Number, required: true, default: 0.0 },
    energy_consumption_meter_227: { type: Number, required: true, default: 0.0 }
});

module.exports = mongoose.model('EnergyData', energySchema);
