const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sensordataSchema = new Schema(
  {
    meter_1: {
      type: Schema.Types.Number,
      required: true,
    },
    Voltage_V1N_meter_1: {
      type: Schema.Types.Number,
      required: true,
    },
    Voltage_V2N_meter_1: {
      type: Schema.Types.Number,
      required: true,
    },
    Voltage_V3N_meter_1: {
      type: Schema.Types.Number,
      required: true,
    },
    Voltage_V12_meter_1: {
      type: Schema.Types.Number,
      required: true,
    },
    Voltage_V23_meter_1: {
      type: Schema.Types.Number,
      required: true,
    },
    Voltage_V31_meter_1: {
      type: Schema.Types.Number,
      required: true,
    },
    Current_I1_meter_1: {
      type: Schema.Types.Number,
      required: true,
    },
    Current_I2_meter_1: {
      type: Schema.Types.Number,
      required: true,
    },
    Current_I3_meter_1: {
      type: Schema.Types.Number,
      required: true,
    },
    Total_KW_meter_1: {
      type: Schema.Types.Number,
      required: true,
    },
    Total_KVA_meter_1: {
      type: Schema.Types.Number,
      required: true,
    },
    Total_KVAR_meter_1: {
      type: Schema.Types.Number,
      required: true,
    },
    Avg_PF_meter_1: {
      type: Schema.Types.Number,
      required: true,
    },
    Frequency_meter_1: {
      type: Schema.Types.Number,
      required: true,
    },
    TotalNet_KWH_meter_1: {
      type: Schema.Types.Number,
      required: true,
    },
    TotalNet_KVAH_meter_1: {
      type: Schema.Types.Number,
      required: true,
    },
    TotalNet_KVARH_meter_1: {
      type: Schema.Types.Number,
      required: true,
    },
    Neutral_Current_meter_1: {
      type: Schema.Types.Number,
      required: true,
    },
    THD_V1_meter_1: {
      type: Schema.Types.Number,
      required: true,
    },
    THD_V2_meter_1: {
      type: Schema.Types.Number,
      required: true,
    },
    THD_V3_meter_1: {
      type: Schema.Types.Number,
      required: true,
    },
    THD_I1_meter_1: {
      type: Schema.Types.Number,
      required: true,
    },
    THD_I2_meter_1: {
      type: Schema.Types.Number,
      required: true,
    },
    THD_I3_meter_1: {
      type: Schema.Types.Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("sensordata", sensordataSchema);
