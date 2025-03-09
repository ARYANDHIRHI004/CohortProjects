import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name:{
        type:String,
    },

    email:{
        type:String,
     },

    password:{
        type:String,
    },

    role:{
        type:String,
        eum:['user', 'admin'],
        default: 'user'
    },

    isVarified:{
        type:Boolean,
        default: false
    },

    verificationToken:{
        type:String,
    },

    verificationExpires:{
        type:Date,
    },

    resetPasswordToken:{
        type:String
    },
    
    resetPasswordExpires:{
        type:String
    }
},{timestamps: true})

export const User = mongoose.model("User", userSchema) 