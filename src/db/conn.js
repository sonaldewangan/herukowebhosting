const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/projectFirst").then(()=>{
    console.log("Connection stablished")
}).catch((err)=>{
    console.log("No Connection")
})