const SensorData = require("../models/sensordata");

const sensordataHandler = async (req, res, next) => {
  const {
    meter_id,
    Voltage_V1N,
    Voltage_V2N,
    Voltage_V3N,
    Voltage_V12,
    Voltage_V23,
    Voltage_V31,
    Current_I1,
    Current_I2,
    Current_I3,
    Total_KW,
    Total_KVA,
    Total_KVAR,
    Avg_PF,
    Frequency,
    TotalNet_KWH,
    TotalNet_KVAH,
    TotalNet_KVARH,
    Neutral_Current,
    THD_V1,
    THD_V2,
    THD_V3,
    THD_I1,
    THD_I2,
    THD_I3,
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

  if (exists) {
    const result = await SensorData.findOneAndUpdate(
      { _id: sensordata[0]._id },
      {
        meter: meter_id,
        Voltage_V1N: Voltage_V1N,
        Voltage_V2N: Voltage_V2N,
        Voltage_V3N: Voltage_V3N,
        Voltage_V12: Voltage_V12,
        Voltage_V23: Voltage_V23,
        Voltage_V31: Voltage_V31,
        Current_I1: Current_I1,
        Current_I2: Current_I2,
        Current_I3: Current_I3,
        Total_KW: Total_KW,
        Total_KVA: Total_KVA,
        Total_KVAR: Total_KVAR,
        Avg_PF: Avg_PF,
        Frequency: Frequency,
        TotalNet_KWH: TotalNet_KWH,
        TotalNet_KVAH: TotalNet_KVAH,
        TotalNet_KVARH: TotalNet_KVARH,
        Neutral_Current: Neutral_Current,
        THD_V1: THD_V1,
        THD_V2: THD_V2,
        THD_V3: THD_V3,
        THD_I1: THD_I1,
        THD_I2: THD_I2,
        THD_I3: THD_I3,
      }
    );
  } else {
    try {
      const newSensorData = new SensorData({
        meter: meter_id,
        Voltage_V1N: Voltage_V1N,
        Voltage_V2N: Voltage_V2N,
        Voltage_V3N: Voltage_V3N,
        Voltage_V12: Voltage_V12,
        Voltage_V23: Voltage_V23,
        Voltage_V31: Voltage_V31,
        Current_I1: Current_I1,
        Current_I2: Current_I2,
        Current_I3: Current_I3,
        Total_KW: Total_KW,
        Total_KVA: Total_KVA,
        Total_KVAR: Total_KVAR,
        Avg_PF: Avg_PF,
        Frequency: Frequency,
        TotalNet_KWH: TotalNet_KWH,
        TotalNet_KVAH: TotalNet_KVAH,
        TotalNet_KVARH: TotalNet_KVARH,
        Neutral_Current: Neutral_Current,
        THD_V1: THD_V1,
        THD_V2: THD_V2,
        THD_V3: THD_V3,
        THD_I1: THD_I1,
        THD_I2: THD_I2,
        THD_I3: THD_I3,
      });
      await newSensorData.save();
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Updating Data Failed",
      });
    }
  }

  return res.status(200).json({
    message: "Data updated successfully",
  });
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

  const data = {
    meter: sensordata[0].meter,
    Voltage_V1N: sensordata[0].Voltage_V1N,
    Voltage_V2N: sensordata[0].Voltage_V2N,
    Voltage_V3N: sensordata[0].Voltage_V3N,
    Voltage_V12: sensordata[0].Voltage_V12,
    Voltage_V23: sensordata[0].Voltage_V23,
    Voltage_V31: sensordata[0].Voltage_V31,
    Current_I1: sensordata[0].Current_I1,
    Current_I2: sensordata[0].Current_I2,
    Current_I3: sensordata[0].Current_I3,
    Total_KW: sensordata[0].Total_KW,
    Total_KVA: sensordata[0].Total_KVA,
    Total_KVAR: sensordata[0].Total_KVAR,
    Avg_PF: sensordata[0].Avg_PF,
    Frequency: sensordata[0].Frequency,
    TotalNet_KWH: sensordata[0].TotalNet_KWH,
    TotalNet_KVAH: sensordata[0].TotalNet_KVAH,
    TotalNet_KVARH: sensordata[0].TotalNet_KVARH,
    Neutral_Current: sensordata[0].Neutral_Current,
    THD_V1: sensordata[0].THD_V1,
    THD_V2: sensordata[0].THD_V2,
    THD_V3: sensordata[0].THD_V3,
    THD_I1: sensordata[0].THD_I1,
    THD_I2: sensordata[0].THD_I2,
    THD_I3: sensordata[0].THD_I3,
  };

  return res.status(200).json(data);
};

exports.sensordataHandler = sensordataHandler;
exports.getdataHandler = getdataHandler;
