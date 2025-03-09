import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

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

userSchema.pre('save', async function(next){
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})

export const User = mongoose.model("User", userSchema) 