const SensorData = require("../models/sensordata");

const sensordataHandler = async (req, res, next) => {
  const {
    // Meter 1
    meter_1, Voltage_V1N_meter_1, Voltage_V2N_meter_1, Voltage_V3N_meter_1, Voltage_V12_meter_1,
    Voltage_V23_meter_1, Voltage_V31_meter_1, Current_I1_meter_1, Current_I2_meter_1, Current_I3_meter_1,
    Total_KW_meter_1, Total_KVA_meter_1, Total_KVAR_meter_1, Avg_PF_meter_1, Frequency_meter_1,
    TotalNet_KWH_meter_1, TotalNet_KVAH_meter_1, TotalNet_KVARH_meter_1, Neutral_Current_meter_1,
    THD_V1_meter_1, THD_V2_meter_1, THD_V3_meter_1, THD_I1_meter_1, THD_I2_meter_1, THD_I3_meter_1,

    // Meter 2
    meter_2, Voltage_V1N_meter_2, Voltage_V2N_meter_2, Voltage_V3N_meter_2, Voltage_V12_meter_2,
    Voltage_V23_meter_2, Voltage_V31_meter_2, Current_I1_meter_2, Current_I2_meter_2, Current_I3_meter_2,
    Total_KW_meter_2, Total_KVA_meter_2, Total_KVAR_meter_2, Avg_PF_meter_2, Frequency_meter_2,
    TotalNet_KWH_meter_2, TotalNet_KVAH_meter_2, TotalNet_KVARH_meter_2, Neutral_Current_meter_2,
    THD_V1_meter_2, THD_V2_meter_2, THD_V3_meter_2, THD_I1_meter_2, THD_I2_meter_2, THD_I3_meter_2,

    // Meter 3
    meter_3, Voltage_V1N_meter_3, Voltage_V2N_meter_3, Voltage_V3N_meter_3, Voltage_V12_meter_3,
    Voltage_V23_meter_3, Voltage_V31_meter_3, Current_I1_meter_3, Current_I2_meter_3, Current_I3_meter_3,
    Total_KW_meter_3, Total_KVA_meter_3, Total_KVAR_meter_3, Avg_PF_meter_3, Frequency_meter_3,
    TotalNet_KWH_meter_3, TotalNet_KVAH_meter_3, TotalNet_KVARH_meter_3, Neutral_Current_meter_3,
    THD_V1_meter_3, THD_V2_meter_3, THD_V3_meter_3, THD_I1_meter_3, THD_I2_meter_3, THD_I3_meter_3,

    // Meter 4
    meter_4, Voltage_V1N_meter_4, Voltage_V2N_meter_4, Voltage_V3N_meter_4, Voltage_V12_meter_4,
    Voltage_V23_meter_4, Voltage_V31_meter_4, Current_I1_meter_4, Current_I2_meter_4, Current_I3_meter_4,
    Total_KW_meter_4, Total_KVA_meter_4, Total_KVAR_meter_4, Avg_PF_meter_4, Frequency_meter_4,
    TotalNet_KWH_meter_4, TotalNet_KVAH_meter_4, TotalNet_KVARH_meter_4, Neutral_Current_meter_4,
    THD_V1_meter_4, THD_V2_meter_4, THD_V3_meter_4, THD_I1_meter_4, THD_I2_meter_4, THD_I3_meter_4,

    // Meter 5
    meter_5, Voltage_V1N_meter_5, Voltage_V2N_meter_5, Voltage_V3N_meter_5, Voltage_V12_meter_5,
    Voltage_V23_meter_5, Voltage_V31_meter_5, Current_I1_meter_5, Current_I2_meter_5, Current_I3_meter_5,
    Total_KW_meter_5, Total_KVA_meter_5, Total_KVAR_meter_5, Avg_PF_meter_5, Frequency_meter_5,
    TotalNet_KWH_meter_5, TotalNet_KVAH_meter_5, TotalNet_KVARH_meter_5, Neutral_Current_meter_5,
    THD_V1_meter_5, THD_V2_meter_5, THD_V3_meter_5, THD_I1_meter_5, THD_I2_meter_5, THD_I3_meter_5,

    // Meter 6
    meter_6, Voltage_V1N_meter_6, Voltage_V2N_meter_6, Voltage_V3N_meter_6, Voltage_V12_meter_6,
    Voltage_V23_meter_6, Voltage_V31_meter_6, Current_I1_meter_6, Current_I2_meter_6, Current_I3_meter_6,
    Total_KW_meter_6, Total_KVA_meter_6, Total_KVAR_meter_6, Avg_PF_meter_6, Frequency_meter_6,
    TotalNet_KWH_meter_6, TotalNet_KVAH_meter_6, TotalNet_KVARH_meter_6, Neutral_Current_meter_6,
    THD_V1_meter_6, THD_V2_meter_6, THD_V3_meter_6, THD_I1_meter_6, THD_I2_meter_6, THD_I3_meter_6,

    // Meter 7
    meter_7, Voltage_V1N_meter_7, Voltage_V2N_meter_7, Voltage_V3N_meter_7, Voltage_V12_meter_7,
    Voltage_V23_meter_7, Voltage_V31_meter_7, Current_I1_meter_7, Current_I2_meter_7, Current_I3_meter_7,
    Total_KW_meter_7, Total_KVA_meter_7, Total_KVAR_meter_7, Avg_PF_meter_7, Frequency_meter_7,
    TotalNet_KWH_meter_7, TotalNet_KVAH_meter_7, TotalNet_KVARH_meter_7, Neutral_Current_meter_7,
    THD_V1_meter_7, THD_V2_meter_7, THD_V3_meter_7, THD_I1_meter_7, THD_I2_meter_7, THD_I3_meter_7,

    // Meter 8
    meter_8, Voltage_V1N_meter_8, Voltage_V2N_meter_8, Voltage_V3N_meter_8, Voltage_V12_meter_8,
    Voltage_V23_meter_8, Voltage_V31_meter_8, Current_I1_meter_8, Current_I2_meter_8, Current_I3_meter_8,
    Total_KW_meter_8, Total_KVA_meter_8, Total_KVAR_meter_8, Avg_PF_meter_8, Frequency_meter_8,
    TotalNet_KWH_meter_8, TotalNet_KVAH_meter_8, TotalNet_KVARH_meter_8, Neutral_Current_meter_8,
    THD_V1_meter_8, THD_V2_meter_8, THD_V3_meter_8, THD_I1_meter_8, THD_I2_meter_8, THD_I3_meter_8,

    // Meter 9
    meter_9, Voltage_V1N_meter_9, Voltage_V2N_meter_9, Voltage_V3N_meter_9, Voltage_V12_meter_9,
    Voltage_V23_meter_9, Voltage_V31_meter_9, Current_I1_meter_9, Current_I2_meter_9, Current_I3_meter_9,
    Total_KW_meter_9, Total_KVA_meter_9, Total_KVAR_meter_9, Avg_PF_meter_9, Frequency_meter_9,
    TotalNet_KWH_meter_9, TotalNet_KVAH_meter_9, TotalNet_KVARH_meter_9, Neutral_Current_meter_9,
    THD_V1_meter_9, THD_V2_meter_9, THD_V3_meter_9, THD_I1_meter_9, THD_I2_meter_9, THD_I3_meter_9,

    // Meter 10
    meter_10, Voltage_V1N_meter_10, Voltage_V2N_meter_10, Voltage_V3N_meter_10, Voltage_V12_meter_10,
    Voltage_V23_meter_10, Voltage_V31_meter_10, Current_I1_meter_10, Current_I2_meter_10, Current_I3_meter_10,
    Total_KW_meter_10, Total_KVA_meter_10, Total_KVAR_meter_10, Avg_PF_meter_10, Frequency_meter_10,
    TotalNet_KWH_meter_10, TotalNet_KVAH_meter_10, TotalNet_KVARH_meter_10, Neutral_Current_meter_10,
    THD_V1_meter_10, THD_V2_meter_10, THD_V3_meter_10, THD_I1_meter_10, THD_I2_meter_10, THD_I3_meter_10,

    // Meter 11
    meter_11, Voltage_V1N_meter_11, Voltage_V2N_meter_11, Voltage_V3N_meter_11, Voltage_V12_meter_11,
    Voltage_V23_meter_11, Voltage_V31_meter_11, Current_I1_meter_11, Current_I2_meter_11, Current_I3_meter_11,
    Total_KW_meter_11, Total_KVA_meter_11, Total_KVAR_meter_11, Avg_PF_meter_11, Frequency_meter_11,
    TotalNet_KWH_meter_11, TotalNet_KVAH_meter_11, TotalNet_KVARH_meter_11, Neutral_Current_meter_11,
    THD_V1_meter_11, THD_V2_meter_11, THD_V3_meter_11, THD_I1_meter_11, THD_I2_meter_11, THD_I3_meter_11,

    // Meter 12
    meter_12, Voltage_V1N_meter_12, Voltage_V2N_meter_12, Voltage_V3N_meter_12, Voltage_V12_meter_12,
    Voltage_V23_meter_12, Voltage_V31_meter_12, Current_I1_meter_12, Current_I2_meter_12, Current_I3_meter_12,
    Total_KW_meter_12, Total_KVA_meter_12, Total_KVAR_meter_12, Avg_PF_meter_12, Frequency_meter_12,
    TotalNet_KWH_meter_12, TotalNet_KVAH_meter_12, TotalNet_KVARH_meter_12, Neutral_Current_meter_12,
    THD_V1_meter_12, THD_V2_meter_12, THD_V3_meter_12, THD_I1_meter_12, THD_I2_meter_12, THD_I3_meter_12,

    // Meter 13
    meter_13, Voltage_V1N_meter_13, Voltage_V2N_meter_13, Voltage_V3N_meter_13, Voltage_V12_meter_13,
    Voltage_V23_meter_13, Voltage_V31_meter_13, Current_I1_meter_13, Current_I2_meter_13, Current_I3_meter_13,
    Total_KW_meter_13, Total_KVA_meter_13, Total_KVAR_meter_13, Avg_PF_meter_13, Frequency_meter_13,
    TotalNet_KWH_meter_13, TotalNet_KVAH_meter_13, TotalNet_KVARH_meter_13, Neutral_Current_meter_13,
    THD_V1_meter_13, THD_V2_meter_13, THD_V3_meter_13, THD_I1_meter_13, THD_I2_meter_13, THD_I3_meter_13,

    // Meter 14
    meter_14, Voltage_V1N_meter_14, Voltage_V2N_meter_14, Voltage_V3N_meter_14, Voltage_V12_meter_14,
    Voltage_V23_meter_14, Voltage_V31_meter_14, Current_I1_meter_14, Current_I2_meter_14, Current_I3_meter_14,
    Total_KW_meter_14, Total_KVA_meter_14, Total_KVAR_meter_14, Avg_PF_meter_14, Frequency_meter_14,
    TotalNet_KWH_meter_14, TotalNet_KVAH_meter_14, TotalNet_KVARH_meter_14, Neutral_Current_meter_14,
    THD_V1_meter_14, THD_V2_meter_14, THD_V3_meter_14, THD_I1_meter_14, THD_I2_meter_14, THD_I3_meter_14,
  } = req.body;

  let exists = false;
  let sensordata;
  try {
    sensordata = await SensorData.find();
    if (sensordata.length === 1) {
      exists = true;
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Updating Data Failed",
    });
  }

  const updateData = {
    // Meter 1
    meter_1, Voltage_V1N_meter_1, Voltage_V2N_meter_1, Voltage_V3N_meter_1, Voltage_V12_meter_1,
    Voltage_V23_meter_1, Voltage_V31_meter_1, Current_I1_meter_1, Current_I2_meter_1, Current_I3_meter_1,
    Total_KW_meter_1, Total_KVA_meter_1, Total_KVAR_meter_1, Avg_PF_meter_1, Frequency_meter_1,
    TotalNet_KWH_meter_1, TotalNet_KVAH_meter_1, TotalNet_KVARH_meter_1, Neutral_Current_meter_1,
    THD_V1_meter_1, THD_V2_meter_1, THD_V3_meter_1, THD_I1_meter_1, THD_I2_meter_1, THD_I3_meter_1,

    // Meter 2
    meter_2, Voltage_V1N_meter_2, Voltage_V2N_meter_2, Voltage_V3N_meter_2, Voltage_V12_meter_2,
    Voltage_V23_meter_2, Voltage_V31_meter_2, Current_I1_meter_2, Current_I2_meter_2, Current_I3_meter_2,
    Total_KW_meter_2, Total_KVA_meter_2, Total_KVAR_meter_2, Avg_PF_meter_2, Frequency_meter_2,
    TotalNet_KWH_meter_2, TotalNet_KVAH_meter_2, TotalNet_KVARH_meter_2, Neutral_Current_meter_2,
    THD_V1_meter_2, THD_V2_meter_2, THD_V3_meter_2, THD_I1_meter_2, THD_I2_meter_2, THD_I3_meter_2,

    // Meter 3
    meter_3, Voltage_V1N_meter_3, Voltage_V2N_meter_3, Voltage_V3N_meter_3, Voltage_V12_meter_3,
    Voltage_V23_meter_3, Voltage_V31_meter_3, Current_I1_meter_3, Current_I2_meter_3, Current_I3_meter_3,
    Total_KW_meter_3, Total_KVA_meter_3, Total_KVAR_meter_3, Avg_PF_meter_3, Frequency_meter_3,
    TotalNet_KWH_meter_3, TotalNet_KVAH_meter_3, TotalNet_KVARH_meter_3, Neutral_Current_meter_3,
    THD_V1_meter_3, THD_V2_meter_3, THD_V3_meter_3, THD_I1_meter_3, THD_I2_meter_3, THD_I3_meter_3,

    // Meter 4
    meter_4, Voltage_V1N_meter_4, Voltage_V2N_meter_4, Voltage_V3N_meter_4, Voltage_V12_meter_4,
    Voltage_V23_meter_4, Voltage_V31_meter_4, Current_I1_meter_4, Current_I2_meter_4, Current_I3_meter_4,
    Total_KW_meter_4, Total_KVA_meter_4, Total_KVAR_meter_4, Avg_PF_meter_4, Frequency_meter_4,
    TotalNet_KWH_meter_4, TotalNet_KVAH_meter_4, TotalNet_KVARH_meter_4, Neutral_Current_meter_4,
    THD_V1_meter_4, THD_V2_meter_4, THD_V3_meter_4, THD_I1_meter_4, THD_I2_meter_4, THD_I3_meter_4,

    // Meter 5
    meter_5, Voltage_V1N_meter_5, Voltage_V2N_meter_5, Voltage_V3N_meter_5, Voltage_V12_meter_5,
    Voltage_V23_meter_5, Voltage_V31_meter_5, Current_I1_meter_5, Current_I2_meter_5, Current_I3_meter_5,
    Total_KW_meter_5, Total_KVA_meter_5, Total_KVAR_meter_5, Avg_PF_meter_5, Frequency_meter_5,
    TotalNet_KWH_meter_5, TotalNet_KVAH_meter_5, TotalNet_KVARH_meter_5, Neutral_Current_meter_5,
    THD_V1_meter_5, THD_V2_meter_5, THD_V3_meter_5, THD_I1_meter_5, THD_I2_meter_5, THD_I3_meter_5,

    // Meter 6
    meter_6, Voltage_V1N_meter_6, Voltage_V2N_meter_6, Voltage_V3N_meter_6, Voltage_V12_meter_6,
    Voltage_V23_meter_6, Voltage_V31_meter_6, Current_I1_meter_6, Current_I2_meter_6, Current_I3_meter_6,
    Total_KW_meter_6, Total_KVA_meter_6, Total_KVAR_meter_6, Avg_PF_meter_6, Frequency_meter_6,
    TotalNet_KWH_meter_6, TotalNet_KVAH_meter_6, TotalNet_KVARH_meter_6, Neutral_Current_meter_6,
    THD_V1_meter_6, THD_V2_meter_6, THD_V3_meter_6, THD_I1_meter_6, THD_I2_meter_6, THD_I3_meter_6,

    // Meter 7
    meter_7, Voltage_V1N_meter_7, Voltage_V2N_meter_7, Voltage_V3N_meter_7, Voltage_V12_meter_7,
    Voltage_V23_meter_7, Voltage_V31_meter_7, Current_I1_meter_7, Current_I2_meter_7, Current_I3_meter_7,
    Total_KW_meter_7, Total_KVA_meter_7, Total_KVAR_meter_7, Avg_PF_meter_7, Frequency_meter_7,
    TotalNet_KWH_meter_7, TotalNet_KVAH_meter_7, TotalNet_KVARH_meter_7, Neutral_Current_meter_7,
    THD_V1_meter_7, THD_V2_meter_7, THD_V3_meter_7, THD_I1_meter_7, THD_I2_meter_7, THD_I3_meter_7,

    // Meter 8
    meter_8, Voltage_V1N_meter_8, Voltage_V2N_meter_8, Voltage_V3N_meter_8, Voltage_V12_meter_8,
    Voltage_V23_meter_8, Voltage_V31_meter_8, Current_I1_meter_8, Current_I2_meter_8, Current_I3_meter_8,
    Total_KW_meter_8, Total_KVA_meter_8, Total_KVAR_meter_8, Avg_PF_meter_8, Frequency_meter_8,
    TotalNet_KWH_meter_8, TotalNet_KVAH_meter_8, TotalNet_KVARH_meter_8, Neutral_Current_meter_8,
    THD_V1_meter_8, THD_V2_meter_8, THD_V3_meter_8, THD_I1_meter_8, THD_I2_meter_8, THD_I3_meter_8,

    // Meter 9
    meter_9, Voltage_V1N_meter_9, Voltage_V2N_meter_9, Voltage_V3N_meter_9, Voltage_V12_meter_9,
    Voltage_V23_meter_9, Voltage_V31_meter_9, Current_I1_meter_9, Current_I2_meter_9, Current_I3_meter_9,
    Total_KW_meter_9, Total_KVA_meter_9, Total_KVAR_meter_9, Avg_PF_meter_9, Frequency_meter_9,
    TotalNet_KWH_meter_9, TotalNet_KVAH_meter_9, TotalNet_KVARH_meter_9, Neutral_Current_meter_9,
    THD_V1_meter_9, THD_V2_meter_9, THD_V3_meter_9, THD_I1_meter_9, THD_I2_meter_9, THD_I3_meter_9,

    // Meter 10
    meter_10, Voltage_V1N_meter_10, Voltage_V2N_meter_10, Voltage_V3N_meter_10, Voltage_V12_meter_10,
    Voltage_V23_meter_10, Voltage_V31_meter_10, Current_I1_meter_10, Current_I2_meter_10, Current_I3_meter_10,
    Total_KW_meter_10, Total_KVA_meter_10, Total_KVAR_meter_10, Avg_PF_meter_10, Frequency_meter_10,
    TotalNet_KWH_meter_10, TotalNet_KVAH_meter_10, TotalNet_KVARH_meter_10, Neutral_Current_meter_10,
    THD_V1_meter_10, THD_V2_meter_10, THD_V3_meter_10, THD_I1_meter_10, THD_I2_meter_10, THD_I3_meter_10,

    // Meter 11
    meter_11, Voltage_V1N_meter_11, Voltage_V2N_meter_11, Voltage_V3N_meter_11, Voltage_V12_meter_11,
    Voltage_V23_meter_11, Voltage_V31_meter_11, Current_I1_meter_11, Current_I2_meter_11, Current_I3_meter_11,
    Total_KW_meter_11, Total_KVA_meter_11, Total_KVAR_meter_11, Avg_PF_meter_11, Frequency_meter_11,
    TotalNet_KWH_meter_11, TotalNet_KVAH_meter_11, TotalNet_KVARH_meter_11, Neutral_Current_meter_11,
    THD_V1_meter_11, THD_V2_meter_11, THD_V3_meter_11, THD_I1_meter_11, THD_I2_meter_11, THD_I3_meter_11,

    // Meter 12
    meter_12, Voltage_V1N_meter_12, Voltage_V2N_meter_12, Voltage_V3N_meter_12, Voltage_V12_meter_12,
    Voltage_V23_meter_12, Voltage_V31_meter_12, Current_I1_meter_12, Current_I2_meter_12, Current_I3_meter_12,
    Total_KW_meter_12, Total_KVA_meter_12, Total_KVAR_meter_12, Avg_PF_meter_12, Frequency_meter_12,
    TotalNet_KWH_meter_12, TotalNet_KVAH_meter_12, TotalNet_KVARH_meter_12, Neutral_Current_meter_12,
    THD_V1_meter_12, THD_V2_meter_12, THD_V3_meter_12, THD_I1_meter_12, THD_I2_meter_12, THD_I3_meter_12,

    // Meter 13
    meter_13, Voltage_V1N_meter_13, Voltage_V2N_meter_13, Voltage_V3N_meter_13, Voltage_V12_meter_13,
    Voltage_V23_meter_13, Voltage_V31_meter_13, Current_I1_meter_13, Current_I2_meter_13, Current_I3_meter_13,
    Total_KW_meter_13, Total_KVA_meter_13, Total_KVAR_meter_13, Avg_PF_meter_13, Frequency_meter_13,
    TotalNet_KWH_meter_13, TotalNet_KVAH_meter_13, TotalNet_KVARH_meter_13, Neutral_Current_meter_13,
    THD_V1_meter_13, THD_V2_meter_13, THD_V3_meter_13, THD_I1_meter_13, THD_I2_meter_13, THD_I3_meter_13,

    // Meter 14
    meter_14, Voltage_V1N_meter_14, Voltage_V2N_meter_14, Voltage_V3N_meter_14, Voltage_V12_meter_14,
    Voltage_V23_meter_14, Voltage_V31_meter_14, Current_I1_meter_14, Current_I2_meter_14, Current_I3_meter_14,
    Total_KW_meter_14, Total_KVA_meter_14, Total_KVAR_meter_14, Avg_PF_meter_14, Frequency_meter_14,
    TotalNet_KWH_meter_14, TotalNet_KVAH_meter_14, TotalNet_KVARH_meter_14, Neutral_Current_meter_14,
    THD_V1_meter_14, THD_V2_meter_14, THD_V3_meter_14, THD_I1_meter_14, THD_I2_meter_14, THD_I3_meter_14,
  };

  if (exists) {
    try {
      const result = await SensorData.findOneAndUpdate(
        { _id: sensordata[0]._id },
        updateData
      );
      return res.status(200).json({
        message: "Data updated successfully",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Updating Data Failed",
      });
    }
  } else {
    try {
      const newSensorData = new SensorData(updateData);
      await newSensorData.save();
      return res.status(200).json({
        message: "Data saved successfully",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Saving Data Failed",
      });
    }
  }
};

const getdataHandler = async (req, res, next) => {
  let sensordata;
  try {
    sensordata = await SensorData.find();
    console.log(sensordata);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Getting Data Failed",
    });
  }

  // Assuming you want to return data for all entries or the most recent entry
  const data = sensordata.map(dataEntry => ({
    // Meter 1
    meter_1: dataEntry.meter_1,
    Voltage_V1N_meter_1: dataEntry.Voltage_V1N_meter_1,
    Voltage_V2N_meter_1: dataEntry.Voltage_V2N_meter_1,
    Voltage_V3N_meter_1: dataEntry.Voltage_V3N_meter_1,
    Voltage_V12_meter_1: dataEntry.Voltage_V12_meter_1,
    Voltage_V23_meter_1: dataEntry.Voltage_V23_meter_1,
    Voltage_V31_meter_1: dataEntry.Voltage_V31_meter_1,
    Current_I1_meter_1: dataEntry.Current_I1_meter_1,
    Current_I2_meter_1: dataEntry.Current_I2_meter_1,
    Current_I3_meter_1: dataEntry.Current_I3_meter_1,
    Total_KW_meter_1: dataEntry.Total_KW_meter_1,
    Total_KVA_meter_1: dataEntry.Total_KVA_meter_1,
    Total_KVAR_meter_1: dataEntry.Total_KVAR_meter_1,
    Avg_PF_meter_1: dataEntry.Avg_PF_meter_1,
    Frequency_meter_1: dataEntry.Frequency_meter_1,
    TotalNet_KWH_meter_1: dataEntry.TotalNet_KWH_meter_1,
    TotalNet_KVAH_meter_1: dataEntry.TotalNet_KVAH_meter_1,
    TotalNet_KVARH_meter_1: dataEntry.TotalNet_KVARH_meter_1,
    Neutral_Current_meter_1: dataEntry.Neutral_Current_meter_1,
    THD_V1_meter_1: dataEntry.THD_V1_meter_1,
    THD_V2_meter_1: dataEntry.THD_V2_meter_1,
    THD_V3_meter_1: dataEntry.THD_V3_meter_1,
    THD_I1_meter_1: dataEntry.THD_I1_meter_1,
    THD_I2_meter_1: dataEntry.THD_I2_meter_1,
    THD_I3_meter_1: dataEntry.THD_I3_meter_1,

    // Meter 2
    meter_2: dataEntry.meter_2,
    Voltage_V1N_meter_2: dataEntry.Voltage_V1N_meter_2,
    Voltage_V2N_meter_2: dataEntry.Voltage_V2N_meter_2,
    Voltage_V3N_meter_2: dataEntry.Voltage_V3N_meter_2,
    Voltage_V12_meter_2: dataEntry.Voltage_V12_meter_2,
    Voltage_V23_meter_2: dataEntry.Voltage_V23_meter_2,
    Voltage_V31_meter_2: dataEntry.Voltage_V31_meter_2,
    Current_I1_meter_2: dataEntry.Current_I1_meter_2,
    Current_I2_meter_2: dataEntry.Current_I2_meter_2,
    Current_I3_meter_2: dataEntry.Current_I3_meter_2,
    Total_KW_meter_2: dataEntry.Total_KW_meter_2,
    Total_KVA_meter_2: dataEntry.Total_KVA_meter_2,
    Total_KVAR_meter_2: dataEntry.Total_KVAR_meter_2,
    Avg_PF_meter_2: dataEntry.Avg_PF_meter_2,
    Frequency_meter_2: dataEntry.Frequency_meter_2,
    TotalNet_KWH_meter_2: dataEntry.TotalNet_KWH_meter_2,
    TotalNet_KVAH_meter_2: dataEntry.TotalNet_KVAH_meter_2,
    TotalNet_KVARH_meter_2: dataEntry.TotalNet_KVARH_meter_2,
    Neutral_Current_meter_2: dataEntry.Neutral_Current_meter_2,
    THD_V1_meter_2: dataEntry.THD_V1_meter_2,
    THD_V2_meter_2: dataEntry.THD_V2_meter_2,
    THD_V3_meter_2: dataEntry.THD_V3_meter_2,
    THD_I1_meter_2: dataEntry.THD_I1_meter_2,
    THD_I2_meter_2: dataEntry.THD_I2_meter_2,
    THD_I3_meter_2: dataEntry.THD_I3_meter_2,

    // Meter 3
    meter_3: dataEntry.meter_3,
    Voltage_V1N_meter_3: dataEntry.Voltage_V1N_meter_3,
    Voltage_V2N_meter_3: dataEntry.Voltage_V2N_meter_3,
    Voltage_V3N_meter_3: dataEntry.Voltage_V3N_meter_3,
    Voltage_V12_meter_3: dataEntry.Voltage_V12_meter_3,
    Voltage_V23_meter_3: dataEntry.Voltage_V23_meter_3,
    Voltage_V31_meter_3: dataEntry.Voltage_V31_meter_3,
    Current_I1_meter_3: dataEntry.Current_I1_meter_3,
    Current_I2_meter_3: dataEntry.Current_I2_meter_3,
    Current_I3_meter_3: dataEntry.Current_I3_meter_3,
    Total_KW_meter_3: dataEntry.Total_KW_meter_3,
    Total_KVA_meter_3: dataEntry.Total_KVA_meter_3,
    Total_KVAR_meter_3: dataEntry.Total_KVAR_meter_3,
    Avg_PF_meter_3: dataEntry.Avg_PF_meter_3,
    Frequency_meter_3: dataEntry.Frequency_meter_3,
    TotalNet_KWH_meter_3: dataEntry.TotalNet_KWH_meter_3,
    TotalNet_KVAH_meter_3: dataEntry.TotalNet_KVAH_meter_3,
    TotalNet_KVARH_meter_3: dataEntry.TotalNet_KVARH_meter_3,
    Neutral_Current_meter_3: dataEntry.Neutral_Current_meter_3,
    THD_V1_meter_3: dataEntry.THD_V1_meter_3,
    THD_V2_meter_3: dataEntry.THD_V2_meter_3,
    THD_V3_meter_3: dataEntry.THD_V3_meter_3,
    THD_I1_meter_3: dataEntry.THD_I1_meter_3,
    THD_I2_meter_3: dataEntry.THD_I2_meter_3,
    THD_I3_meter_3: dataEntry.THD_I3_meter_3,

    // Continue similarly for Meter 4 through Meter 14...
    meter_4: dataEntry.meter_4,
    Voltage_V1N_meter_4: dataEntry.Voltage_V1N_meter_4,
    Voltage_V2N_meter_4: dataEntry.Voltage_V2N_meter_4,
    Voltage_V3N_meter_4: dataEntry.Voltage_V3N_meter_4,
    Voltage_V12_meter_4: dataEntry.Voltage_V12_meter_4,
    Voltage_V23_meter_4: dataEntry.Voltage_V23_meter_4,
    Voltage_V31_meter_4: dataEntry.Voltage_V31_meter_4,
    Current_I1_meter_4: dataEntry.Current_I1_meter_4,
    Current_I2_meter_4: dataEntry.Current_I2_meter_4,
    Current_I3_meter_4: dataEntry.Current_I3_meter_4,
    Total_KW_meter_4: dataEntry.Total_KW_meter_4,
    Total_KVA_meter_4: dataEntry.Total_KVA_meter_4,
    Total_KVAR_meter_4: dataEntry.Total_KVAR_meter_4,
    Avg_PF_meter_4: dataEntry.Avg_PF_meter_4,
    Frequency_meter_4: dataEntry.Frequency_meter_4,
    TotalNet_KWH_meter_4: dataEntry.TotalNet_KWH_meter_4,
    TotalNet_KVAH_meter_4: dataEntry.TotalNet_KVAH_meter_4,
    TotalNet_KVARH_meter_4: dataEntry.TotalNet_KVARH_meter_4,
    Neutral_Current_meter_4: dataEntry.Neutral_Current_meter_4,
    THD_V1_meter_4: dataEntry.THD_V1_meter_4,
    THD_V2_meter_4: dataEntry.THD_V2_meter_4,
    THD_V3_meter_4: dataEntry.THD_V3_meter_4,
    THD_I1_meter_4: dataEntry.THD_I1_meter_4,
    THD_I2_meter_4: dataEntry.THD_I2_meter_4,
    THD_I3_meter_4: dataEntry.THD_I3_meter_4,

    // Continue similarly for Meter 5 through Meter 14...
    meter_5: dataEntry.meter_5,
    Voltage_V1N_meter_5: dataEntry.Voltage_V1N_meter_5,
    Voltage_V2N_meter_5: dataEntry.Voltage_V2N_meter_5,
    Voltage_V3N_meter_5: dataEntry.Voltage_V3N_meter_5,
    Voltage_V12_meter_5: dataEntry.Voltage_V12_meter_5,
    Voltage_V23_meter_5: dataEntry.Voltage_V23_meter_5,
    Voltage_V31_meter_5: dataEntry.Voltage_V31_meter_5,
    Current_I1_meter_5: dataEntry.Current_I1_meter_5,
    Current_I2_meter_5: dataEntry.Current_I2_meter_5,
    Current_I3_meter_5: dataEntry.Current_I3_meter_5,
    Total_KW_meter_5: dataEntry.Total_KW_meter_5,
    Total_KVA_meter_5: dataEntry.Total_KVA_meter_5,
    Total_KVAR_meter_5: dataEntry.Total_KVAR_meter_5,
    Avg_PF_meter_5: dataEntry.Avg_PF_meter_5,
    Frequency_meter_5: dataEntry.Frequency_meter_5,
    TotalNet_KWH_meter_5: dataEntry.TotalNet_KWH_meter_5,
    TotalNet_KVAH_meter_5: dataEntry.TotalNet_KVAH_meter_5,
    TotalNet_KVARH_meter_5: dataEntry.TotalNet_KVARH_meter_5,
    Neutral_Current_meter_5: dataEntry.Neutral_Current_meter_5,
    THD_V1_meter_5: dataEntry.THD_V1_meter_5,
    THD_V2_meter_5: dataEntry.THD_V2_meter_5,
    THD_V3_meter_5: dataEntry.THD_V3_meter_5,
    THD_I1_meter_5: dataEntry.THD_I1_meter_5,
    THD_I2_meter_5: dataEntry.THD_I2_meter_5,
    THD_I3_meter_5: dataEntry.THD_I3_meter_5,

    // Continue similarly for Meter 6 through Meter 14...
    // Example for Meter 6
    meter_6: dataEntry.meter_6,
    Voltage_V1N_meter_6: dataEntry.Voltage_V1N_meter_6,
    Voltage_V2N_meter_6: dataEntry.Voltage_V2N_meter_6,
    Voltage_V3N_meter_6: dataEntry.Voltage_V3N_meter_6,
    Voltage_V12_meter_6: dataEntry.Voltage_V12_meter_6,
    Voltage_V23_meter_6: dataEntry.Voltage_V23_meter_6,
    Voltage_V31_meter_6: dataEntry.Voltage_V31_meter_6,
    Current_I1_meter_6: dataEntry.Current_I1_meter_6,
    Current_I2_meter_6: dataEntry.Current_I2_meter_6,
    Current_I3_meter_6: dataEntry.Current_I3_meter_6,
    Total_KW_meter_6: dataEntry.Total_KW_meter_6,
    Total_KVA_meter_6: dataEntry.Total_KVA_meter_6,
    Total_KVAR_meter_6: dataEntry.Total_KVAR_meter_6,
    Avg_PF_meter_6: dataEntry.Avg_PF_meter_6,
    Frequency_meter_6: dataEntry.Frequency_meter_6,
    TotalNet_KWH_meter_6: dataEntry.TotalNet_KWH_meter_6,
    TotalNet_KVAH_meter_6: dataEntry.TotalNet_KVAH_meter_6,
    TotalNet_KVARH_meter_6: dataEntry.TotalNet_KVARH_meter_6,
    Neutral_Current_meter_6: dataEntry.Neutral_Current_meter_6,
    THD_V1_meter_6: dataEntry.THD_V1_meter_6,
    THD_V2_meter_6: dataEntry.THD_V2_meter_6,
    THD_V3_meter_6: dataEntry.THD_V3_meter_6,
    THD_I1_meter_6: dataEntry.THD_I1_meter_6,
    THD_I2_meter_6: dataEntry.THD_I2_meter_6,
    THD_I3_meter_6: dataEntry.THD_I3_meter_6,

    // Example for Meter 7
    meter_7: dataEntry.meter_7,
    Voltage_V1N_meter_7: dataEntry.Voltage_V1N_meter_7,
    Voltage_V2N_meter_7: dataEntry.Voltage_V2N_meter_7,
    Voltage_V3N_meter_7: dataEntry.Voltage_V3N_meter_7,
    Voltage_V12_meter_7: dataEntry.Voltage_V12_meter_7,
    Voltage_V23_meter_7: dataEntry.Voltage_V23_meter_7,
    Voltage_V31_meter_7: dataEntry.Voltage_V31_meter_7,
    Current_I1_meter_7: dataEntry.Current_I1_meter_7,
    Current_I2_meter_7: dataEntry.Current_I2_meter_7,
    Current_I3_meter_7: dataEntry.Current_I3_meter_7,
    Total_KW_meter_7: dataEntry.Total_KW_meter_7,
    Total_KVA_meter_7: dataEntry.Total_KVA_meter_7,
    Total_KVAR_meter_7: dataEntry.Total_KVAR_meter_7,
    Avg_PF_meter_7: dataEntry.Avg_PF_meter_7,
    Frequency_meter_7: dataEntry.Frequency_meter_7,
    TotalNet_KWH_meter_7: dataEntry.TotalNet_KWH_meter_7,
    TotalNet_KVAH_meter_7: dataEntry.TotalNet_KVAH_meter_7,
    TotalNet_KVARH_meter_7: dataEntry.TotalNet_KVARH_meter_7,
    Neutral_Current_meter_7: dataEntry.Neutral_Current_meter_7,
    THD_V1_meter_7: dataEntry.THD_V1_meter_7,
    THD_V2_meter_7: dataEntry.THD_V2_meter_7,
    THD_V3_meter_7: dataEntry.THD_V3_meter_7,
    THD_I1_meter_7: dataEntry.THD_I1_meter_7,
    THD_I2_meter_7: dataEntry.THD_I2_meter_7,
    THD_I3_meter_7: dataEntry.THD_I3_meter_7,

    // Example for Meter 8
    meter_8: dataEntry.meter_8,
    Voltage_V1N_meter_8: dataEntry.Voltage_V1N_meter_8,
    Voltage_V2N_meter_8: dataEntry.Voltage_V2N_meter_8,
    Voltage_V3N_meter_8: dataEntry.Voltage_V3N_meter_8,
    Voltage_V12_meter_8: dataEntry.Voltage_V12_meter_8,
    Voltage_V23_meter_8: dataEntry.Voltage_V23_meter_8,
    Voltage_V31_meter_8: dataEntry.Voltage_V31_meter_8,
    Current_I1_meter_8: dataEntry.Current_I1_meter_8,
    Current_I2_meter_8: dataEntry.Current_I2_meter_8,
    Current_I3_meter_8: dataEntry.Current_I3_meter_8,
    Total_KW_meter_8: dataEntry.Total_KW_meter_8,
    Total_KVA_meter_8: dataEntry.Total_KVA_meter_8,
    Total_KVAR_meter_8: dataEntry.Total_KVAR_meter_8,
    Avg_PF_meter_8: dataEntry.Avg_PF_meter_8,
    Frequency_meter_8: dataEntry.Frequency_meter_8,
    TotalNet_KWH_meter_8: dataEntry.TotalNet_KWH_meter_8,
    TotalNet_KVAH_meter_8: dataEntry.TotalNet_KVAH_meter_8,
    TotalNet_KVARH_meter_8: dataEntry.TotalNet_KVARH_meter_8,
    Neutral_Current_meter_8: dataEntry.Neutral_Current_meter_8,
    THD_V1_meter_8: dataEntry.THD_V1_meter_8,
    THD_V2_meter_8: dataEntry.THD_V2_meter_8,
    THD_V3_meter_8: dataEntry.THD_V3_meter_8,
    THD_I1_meter_8: dataEntry.THD_I1_meter_8,
    THD_I2_meter_8: dataEntry.THD_I2_meter_8,
    THD_I3_meter_8: dataEntry.THD_I3_meter_8,

    //Meter 9
    meter_9: dataEntry.meter_9,
    Voltage_V1N_meter_9: dataEntry.Voltage_V1N_meter_9,
    Voltage_V2N_meter_9: dataEntry.Voltage_V2N_meter_9,
    Voltage_V3N_meter_9: dataEntry.Voltage_V3N_meter_9,
    Voltage_V12_meter_9: dataEntry.Voltage_V12_meter_9,
    Voltage_V23_meter_9: dataEntry.Voltage_V23_meter_9,
    Voltage_V31_meter_9: dataEntry.Voltage_V31_meter_9,
    Current_I1_meter_9: dataEntry.Current_I1_meter_9,
    Current_I2_meter_9: dataEntry.Current_I2_meter_9,
    Current_I3_meter_9: dataEntry.Current_I3_meter_9,
    Total_KW_meter_9: dataEntry.Total_KW_meter_9,
    Total_KVA_meter_9: dataEntry.Total_KVA_meter_9,
    Total_KVAR_meter_9: dataEntry.Total_KVAR_meter_9,
    Avg_PF_meter_9: dataEntry.Avg_PF_meter_9,
    Frequency_meter_9: dataEntry.Frequency_meter_9,
    TotalNet_KWH_meter_9: dataEntry.TotalNet_KWH_meter_9,
    TotalNet_KVAH_meter_9: dataEntry.TotalNet_KVAH_meter_9,
    TotalNet_KVARH_meter_9: dataEntry.TotalNet_KVARH_meter_9,
    Neutral_Current_meter_9: dataEntry.Neutral_Current_meter_9,
    THD_V1_meter_9: dataEntry.THD_V1_meter_9,
    THD_V2_meter_9: dataEntry.THD_V2_meter_9,
    THD_V3_meter_9: dataEntry.THD_V3_meter_9,
    THD_I1_meter_9: dataEntry.THD_I1_meter_9,
    THD_I2_meter_9: dataEntry.THD_I2_meter_9,
    THD_I3_meter_9: dataEntry.THD_I3_meter_9,

    // Meter 10
    meter_10: dataEntry.meter_10,
    Voltage_V1N_meter_10: dataEntry.Voltage_V1N_meter_10,
    Voltage_V2N_meter_10: dataEntry.Voltage_V2N_meter_10,
    Voltage_V3N_meter_10: dataEntry.Voltage_V3N_meter_10,
    Voltage_V12_meter_10: dataEntry.Voltage_V12_meter_10,
    Voltage_V23_meter_10: dataEntry.Voltage_V23_meter_10,
    Voltage_V31_meter_10: dataEntry.Voltage_V31_meter_10,
    Current_I1_meter_10: dataEntry.Current_I1_meter_10,
    Current_I2_meter_10: dataEntry.Current_I2_meter_10,
    Current_I3_meter_10: dataEntry.Current_I3_meter_10,
    Total_KW_meter_10: dataEntry.Total_KW_meter_10,
    Total_KVA_meter_10: dataEntry.Total_KVA_meter_10,
    Total_KVAR_meter_10: dataEntry.Total_KVAR_meter_10,
    Avg_PF_meter_10: dataEntry.Avg_PF_meter_10,
    Frequency_meter_10: dataEntry.Frequency_meter_10,
    TotalNet_KWH_meter_10: dataEntry.TotalNet_KWH_meter_10,
    TotalNet_KVAH_meter_10: dataEntry.TotalNet_KVAH_meter_10,
    TotalNet_KVARH_meter_10: dataEntry.TotalNet_KVARH_meter_10,
    Neutral_Current_meter_10: dataEntry.Neutral_Current_meter_10,
    THD_V1_meter_10: dataEntry.THD_V1_meter_10,
    THD_V2_meter_10: dataEntry.THD_V2_meter_10,
    THD_V3_meter_10: dataEntry.THD_V3_meter_10,
    THD_I1_meter_10: dataEntry.THD_I1_meter_10,
    THD_I2_meter_10: dataEntry.THD_I2_meter_10,
    THD_I3_meter_10: dataEntry.THD_I3_meter_10,

    // Meter 11
    meter_11: dataEntry.meter_11,
    Voltage_V1N_meter_11: dataEntry.Voltage_V1N_meter_11,
    Voltage_V2N_meter_11: dataEntry.Voltage_V2N_meter_11,
    Voltage_V3N_meter_11: dataEntry.Voltage_V3N_meter_11,
    Voltage_V12_meter_11: dataEntry.Voltage_V12_meter_11,
    Voltage_V23_meter_11: dataEntry.Voltage_V23_meter_11,
    Voltage_V31_meter_11: dataEntry.Voltage_V31_meter_11,
    Current_I1_meter_11: dataEntry.Current_I1_meter_11,
    Current_I2_meter_11: dataEntry.Current_I2_meter_11,
    Current_I3_meter_11: dataEntry.Current_I3_meter_11,
    Total_KW_meter_11: dataEntry.Total_KW_meter_11,
    Total_KVA_meter_11: dataEntry.Total_KVA_meter_11,
    Total_KVAR_meter_11: dataEntry.Total_KVAR_meter_11,
    Avg_PF_meter_11: dataEntry.Avg_PF_meter_11,
    Frequency_meter_11: dataEntry.Frequency_meter_11,
    TotalNet_KWH_meter_11: dataEntry.TotalNet_KWH_meter_11,
    TotalNet_KVAH_meter_11: dataEntry.TotalNet_KVAH_meter_11,
    TotalNet_KVARH_meter_11: dataEntry.TotalNet_KVARH_meter_11,
    Neutral_Current_meter_11: dataEntry.Neutral_Current_meter_11,
    THD_V1_meter_11: dataEntry.THD_V1_meter_11,
    THD_V2_meter_11: dataEntry.THD_V2_meter_11,
    THD_V3_meter_11: dataEntry.THD_V3_meter_11,
    THD_I1_meter_11: dataEntry.THD_I1_meter_11,
    THD_I2_meter_11: dataEntry.THD_I2_meter_11,
    THD_I3_meter_11: dataEntry.THD_I3_meter_11,

    // Meter 12
    meter_12: dataEntry.meter_12,
    Voltage_V1N_meter_12: dataEntry.Voltage_V1N_meter_12,
    Voltage_V2N_meter_12: dataEntry.Voltage_V2N_meter_12,
    Voltage_V3N_meter_12: dataEntry.Voltage_V3N_meter_12,
    Voltage_V12_meter_12: dataEntry.Voltage_V12_meter_12,
    Voltage_V23_meter_12: dataEntry.Voltage_V23_meter_12,
    Voltage_V31_meter_12: dataEntry.Voltage_V31_meter_12,
    Current_I1_meter_12: dataEntry.Current_I1_meter_12,
    Current_I2_meter_12: dataEntry.Current_I2_meter_12,
    Current_I3_meter_12: dataEntry.Current_I3_meter_12,
    Total_KW_meter_12: dataEntry.Total_KW_meter_12,
    Total_KVA_meter_12: dataEntry.Total_KVA_meter_12,
    Total_KVAR_meter_12: dataEntry.Total_KVAR_meter_12,
    Avg_PF_meter_12: dataEntry.Avg_PF_meter_12,
    Frequency_meter_12: dataEntry.Frequency_meter_12,
    TotalNet_KWH_meter_12: dataEntry.TotalNet_KWH_meter_12,
    TotalNet_KVAH_meter_12: dataEntry.TotalNet_KVAH_meter_12,
    TotalNet_KVARH_meter_12: dataEntry.TotalNet_KVARH_meter_12,
    Neutral_Current_meter_12: dataEntry.Neutral_Current_meter_12,
    THD_V1_meter_12: dataEntry.THD_V1_meter_12,
    THD_V2_meter_12: dataEntry.THD_V2_meter_12,
    THD_V3_meter_12: dataEntry.THD_V3_meter_12,
    THD_I1_meter_12: dataEntry.THD_I1_meter_12,
    THD_I2_meter_12: dataEntry.THD_I2_meter_12,
    THD_I3_meter_12: dataEntry.THD_I3_meter_12,

    // Meter 13
    meter_13: dataEntry.meter_13,
    Voltage_V1N_meter_13: dataEntry.Voltage_V1N_meter_13,
    Voltage_V2N_meter_13: dataEntry.Voltage_V2N_meter_13,
    Voltage_V3N_meter_13: dataEntry.Voltage_V3N_meter_13,
    Voltage_V12_meter_13: dataEntry.Voltage_V12_meter_13,
    Voltage_V23_meter_13: dataEntry.Voltage_V23_meter_13,
    Voltage_V31_meter_13: dataEntry.Voltage_V31_meter_13,
    Current_I1_meter_13: dataEntry.Current_I1_meter_13,
    Current_I2_meter_13: dataEntry.Current_I2_meter_13,
    Current_I3_meter_13: dataEntry.Current_I3_meter_13,
    Total_KW_meter_13: dataEntry.Total_KW_meter_13,
    Total_KVA_meter_13: dataEntry.Total_KVA_meter_13,
    Total_KVAR_meter_13: dataEntry.Total_KVAR_meter_13,
    Avg_PF_meter_13: dataEntry.Avg_PF_meter_13,
    Frequency_meter_13: dataEntry.Frequency_meter_13,
    TotalNet_KWH_meter_13: dataEntry.TotalNet_KWH_meter_13,
    TotalNet_KVAH_meter_13: dataEntry.TotalNet_KVAH_meter_13,
    TotalNet_KVARH_meter_13: dataEntry.TotalNet_KVARH_meter_13,
    Neutral_Current_meter_13: dataEntry.Neutral_Current_meter_13,
    THD_V1_meter_13: dataEntry.THD_V1_meter_13,
    THD_V2_meter_13: dataEntry.THD_V2_meter_13,
    THD_V3_meter_13: dataEntry.THD_V3_meter_13,
    THD_I1_meter_13: dataEntry.THD_I1_meter_13,
    THD_I2_meter_13: dataEntry.THD_I2_meter_13,
    THD_I3_meter_13: dataEntry.THD_I3_meter_13,

    // Meter 14
    meter_14: dataEntry.meter_14,
    Voltage_V1N_meter_14: dataEntry.Voltage_V1N_meter_14,
    Voltage_V2N_meter_14: dataEntry.Voltage_V2N_meter_14,
    Voltage_V3N_meter_14: dataEntry.Voltage_V3N_meter_14,
    Voltage_V12_meter_14: dataEntry.Voltage_V12_meter_14,
    Voltage_V23_meter_14: dataEntry.Voltage_V23_meter_14,
    Voltage_V31_meter_14: dataEntry.Voltage_V31_meter_14,
    Current_I1_meter_14: dataEntry.Current_I1_meter_14,
    Current_I2_meter_14: dataEntry.Current_I2_meter_14,
    Current_I3_meter_14: dataEntry.Current_I3_meter_14,
    Total_KW_meter_14: dataEntry.Total_KW_meter_14,
    Total_KVA_meter_14: dataEntry.Total_KVA_meter_14,
    Total_KVAR_meter_14: dataEntry.Total_KVAR_meter_14,
    Avg_PF_meter_14: dataEntry.Avg_PF_meter_14,
    Frequency_meter_14: dataEntry.Frequency_meter_14,
    TotalNet_KWH_meter_14: dataEntry.TotalNet_KWH_meter_14,
    TotalNet_KVAH_meter_14: dataEntry.TotalNet_KVAH_meter_14,
    TotalNet_KVARH_meter_14: dataEntry.TotalNet_KVARH_meter_14,
    Neutral_Current_meter_14: dataEntry.Neutral_Current_meter_14,
    THD_V1_meter_14: dataEntry.THD_V1_meter_14,
    THD_V2_meter_14: dataEntry.THD_V2_meter_14,
    THD_V3_meter_14: dataEntry.THD_V3_meter_14,
    THD_I1_meter_14: dataEntry.THD_I1_meter_14,
    THD_I2_meter_14: dataEntry.THD_I2_meter_14,
    THD_I3_meter_14: dataEntry.THD_I3_meter_14,

    
  }));

  return res.status(200).json(data);
};


exports.sensordataHandler = sensordataHandler;
exports.getdataHandler = getdataHandler;
