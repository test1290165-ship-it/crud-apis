const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
          type:String,
         required: true
    },
    phone:{
         type:Number,
          required: true
    },
    password:{
         type:String,
          required: true
    },
    otp:{
        type:Number
    },
    newpass:{
        type:String
    },
    oldpass:{
        type:String
    },
    avatar:{
        type:String
    }

})

const User=mongoose.model("User",userSchema)
module.exports = User;
