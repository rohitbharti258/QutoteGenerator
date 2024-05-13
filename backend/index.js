const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const router = require("./routes/getData");
const Data = require('./models/Data');
const cors = require("cors");
const json = require("./quoteJson")

app.use(cors({ origin: true, credentials: true }));
dotenv.config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB connection is connected ")
  })
  .catch((err) => {
    console.log(err);
  });


// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(express.json);
// app.use("/api", router);

app.post("/addquote", (req, res) => {
  const content = req.body.data;
  console.log(content);
  const newData = new Data({
    data: content
  });
  newData.save().then(() => {
    res.json({ message: 'Data added to database successfully.' });
  }).catch((err) => {
    console.log(err);
  })
  // newData.save((err) => {
  //   if (err) {
  //     console.error(err);
  //     return res.status(500).json({ message: 'Error saving data to database.' });
  //   }
  //   res.json({ message: 'Data added to database successfully.' });
  // });

})

app.get("/getquote", async (req, res) => {
    try {
        const getDatas = await Data.find(); 
        res.status(200).json(getDatas);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch data", error: err.message });
    }
});

app.get("/", async (req, res) => {
  console.log("hiiii")
  res.send("hii")
})
app.listen(5000, () => {
  console.log("Backend is running ");
})