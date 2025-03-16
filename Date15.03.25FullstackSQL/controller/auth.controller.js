import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import crypto from 'crypto';
import jwt from  "jsonwebtoken"

const prisma = new PrismaClient();


export const registerUser = async (req, res)=>{
    try {
        const {name, email, password, phone} =  req.body

        if (!name || !email || !password || !phone) {
            console.log('Data is missing');
            return res.status(400).json({
                success: false,
                message: "all filds are req"
            })
        }
        
        const existedUser = prisma.user.findFirst({
            where: {name, email, password}
        })

        if(existedUser) return res.status(400).json({
            message: "User already exist"
        })
        const hashedPassword = await bcrypt.hash(password, 10)

        const verificationToken = crypto.randomBytes(32).toString("hex")

        await prisma.user.create({
            data:{
                name,
                email,
                password: hashedPassword,
                verificationToken,
                phone

            }
        })

        //Sand mail
        
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "registration failed",
            error
        })
    }
    
}

export const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body
        if (!email || ! password) {
            return res.status(400).json({
                message: "all fields are required"
            })
        }
    
        const user =  await prisma.user.findFirst({
            where: email
        })

        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password"
            })            
        }

        const isMatched = bcrypt.compare(password, user.password)
        if (!isMatched) {
            return res.status(400).json({
                message:"invalid email or password"
            })
        }

        const token = jwt.sign({
            id: user.id,
            role: user.role
        },"shhhhhh",{
            expiresIn: "24h"
        })

        const option = {
            httpOnly: true
        }

        return res.status(200)
        .cookie("token", token, option)
        .json({
            success: true,
            message: "user logged in"
        })

    } catch (error) {
        
    }


}




