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

// router.post("/create",async (req,res)=>{
    
//     const newData  = new Data(req.body)
//     try{
//           const savedData = await newData.save();
//           res.status(200).json(savedData);
//     }catch(err){
//         res.status(500).json(err);
//     }
// })

module.exports = router;
