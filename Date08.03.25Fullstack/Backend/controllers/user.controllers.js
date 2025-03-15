import { User } from "../models/user.model.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config();

const registerUser = async (req, res) => {
  //Take data from user
  //check if data is empty
  //check if user already exist
  //store the user is database
  //Token generate for verification
  //save token in db
  //send token as email to user
  //response- success
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      message: "All filds are required",
    });
  }

  try {
    const existedUser = await User.findOne({ email });
    if (existedUser) {
      return res.status(400).json({
        message: "User already exist",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    console.log(user);

    if (!user) {
      return res.status(500).json({
        message: "User not register",
      });
    }

    const token = crypto.randomBytes(32).toString("hex");
    console.log(token);
    user.verificationToken = token;
    await user.save();

    // Looking to send emails in production? Check out our Email API/SMTP product!
    let transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "75200eea3fee39",
        pass: "0b0f9ef9b59d2c",
      },
    });

    const mailOption = {
      from: "aryanaxprass004@demomailtrap.com",
      to: user.email,
      subject: "Verify your email",
      text: `Please click on the following link: ${process.env.BASE_URL}/api/v1/user/verify/${token}`,
    };

    await transport.sendMail(mailOption);

    return res.status(201).json({
      message: "User create successfully",
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: "User not register",
      success: false,
      error,
    });
  }
};

const varifyUser = async (req, res) => {
  //get token from url
  //validate
  //find user based on token
  //if not
  //isVarified = true
  //remove verification token from db
  //save
  //retuen respose

  const { token } = req.params;
  console.log(token);
  try {
    if (!token) {
      return res.status(400).json({
        message: "Invalid token",
      });
    }

    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(500).json({
        message: "User not found token wala",
      });
    }

    user.isVarified = true;
    user.verificationToken = undefined; //charcha
    await user.save();

    return res.status(200).json({
      message: "Varification successfull",
    });
  } catch (error) {
    return res.status(400).json({
      message: "User not register",
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Empty",
    });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Use not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password or email",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("token", token, options)
      .json({
        message: "User logged in",
        success: true,
        user: {
          id: user._id,
          name: user.name,
          role: user.role,
        },
      });
  } catch (error) {
    return res.status(500).json({
      message: "someting went wrong while login",
    });
  }
};

const logoutUser = async (req, res) => {

  try {
    const options = {
      httpOnly: true,
      secure: true,
    };


    return res.status(200).clearCookie("token", options).json({
      message: "User loggedout successfully",
    });
  } catch (error) {
    return res.status(400).json({
      message: "someting went wrong while login",
    });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user?.id).select("-password");
    console.log(user);
    
    return res.status(200).json({user})
  } catch (error) {
    return res.status(400).json({
      message: "someting went wrong while getting user",
    });
  }
};

const forgotPassword = async (req, res) => {};

const resetPassword = async (req, res) => {};

export {
  registerUser,
  varifyUser,
  loginUser,
  logoutUser,
  getMe,
  resetPassword,
  forgotPassword,
};
