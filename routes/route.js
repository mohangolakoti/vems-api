const express= require('express');

const router=express.Router();


const sensorDataController=require('../controller/controller');


router.post("/sensordata",sensorDataController.sensordataHandler);

router.get("/sensordata",sensorDataController.getdataHandler);

module.exports=router;