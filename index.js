const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotEnv=require("dotenv")
const app = express();
const sensorDataRoutes = require("./routes/route");

dotEnv.config()

app.use(cors());
app.use(bodyParser.json());
app.use("/api", sensorDataRoutes);

app.get("/",(req,res)=>{
  res.send("Welcome")
})

const port = process.env.PORT || 4000;
mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.MONGO_URL)

  .then(() => {
    console.log("Server Running...");
    app.listen(port)
  }).catch((err) => {
    console.log(err);
  });
