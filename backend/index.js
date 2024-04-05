const express = require("express");

const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const router = require("./routes/getData");

const cors  = require("cors");


app.use(cors({origin: true, credentials: true})); 

dotenv.config();
mongoose
    .connect(process.env.MONGO_URL)
    .then(()=> console.log("DB connection is connected "))
    .catch((err)=> {
       console.log(err);
    });
app.use(express.json);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/data", router);

app.get('/',(req,res)=>{
    res.send("data")
})



app.listen(5000,()=>{
    console.log("Backend is running ");
})