const Data = require("../models/Data");
const express  = require('express');
const router = express.Router();

router.get("/",async (req,res)=>{
    console.log(req.body)
    try{
        let getDatas;
        getDatas = await Data.find();
        res.status(200).json(getDatas);
    }catch(err){
        res.status(500).json(err);
    }
})

router.post("/addquote",async (req,res)=>{
    const content = req.body.data;
    console.log(content);

    const newData = new Data({
      data: content
    });
  
    newData.save((err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error saving data to database.' });
      }
      res.json({ message: 'Data added to database successfully.' });
    });
})

module.exports = router;
