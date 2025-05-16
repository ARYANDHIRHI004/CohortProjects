import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },

    email:{
        type: String,
        required: true
    },

    password:{
        type: String,
        required: true,
        minlenght: 6
    },
    
    role:{
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },

    verificationToken:{
        type: String,
    },

    verificationTokenExpiry:{
        type: Date,
    },

    accessToken:{
        type: String,
    },

    accessTokenExpiry:{
        type: Date,
    }

},{timestamps:true});

export const User = mongoose.model('User', userSchema)