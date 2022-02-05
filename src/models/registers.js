const async = require("hbs/lib/async");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")

const shoesSchema = new mongoose.Schema({
    fullname:{
        type:String
    },
    gender:{
        type:String
    },
    email:{
        type:String
    },
    phone:{
        type:Number
    },
    brand:{
        type:String
    },
    password:{
        type:String
    },
    confirmpassword:{
        type:String
    }
})

shoesSchema.pre("save",async function(next){

    if(this.isModified("password")){

        this.password = await bcrypt.hash(this.password,10)

        this.confirmpassword = await bcrypt.hash(this.confirmpassword,10)
    }
    next();

})

const Shoe = new mongoose.model("Shoe",shoesSchema);

module.exports = Shoe;
