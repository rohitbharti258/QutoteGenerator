const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema(
    {
        data:{
            type:String,
            unique:true,
            required:true
        }
        
    },
    {
        timestamps:true
    }
)

module.exports = mongoose.model("Data",DataSchema);