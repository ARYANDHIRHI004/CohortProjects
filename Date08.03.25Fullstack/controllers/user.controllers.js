import { User } from "../models/user.model.js";
import crypto from "crypto";
import nodemailer from "nodemailer"
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'

dotenv.config()

const registerUser = async (req, res) => {
  //Take data from user
  //check if data is empty
  //check if user already exist
  //store the user is database
  //Token generate for verification
  //save token in db
  //send token as email to user
  //response- success
  const { name, email, password} = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      message: "All filds are required",
    });
  }

//   try {
    const existedUser = await User.findOne({email});
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
    const transport = nodemailer.createTransport({
      host: process.env.MAILTRAP_SENDERMAIL,
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });

    const mailOption = {
        from: process.env.MAILTRAP_SENDERMAIL,
        to: user.email,
        subject: "Varify your email",
        text: `Please click on the following link:
        ${process.env.BASE_URL}/api/v1/user/verify/${token}`,
    }

    await transport.sendMail(mailOption)

    res.status(201).json({
        message: "User create successfully",
        success: true,
    })


//   } catch (error) {
//     res.status(400).json({
//         message: "User not register",
//         success: false,
//         error
//     })
//   }
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

  const {token} = req.params
  console.log(token);
  
  if (!token) {
    return res.status(400).json({
        message: "Invalid token"
    })
  }

  const user = await User.findOne({verificationToken : token})
  
  if (!user) {
    return res.status(500).json({
        message: "User not found token wala"
    })
  }

  user.isVarified = true
  user.verificationToken = undefined //charcha
  await user.save()
  
  res.status(200).json({
    message: "Varification successfull"
  })

}

const loginUser = async (req, res) => {
  const {email, password} = req.body

  if (!email || !password) {
    return res.status(400).json({
        message: "Empty"
    })
  }

  try {
    const user = await User.findOne({email});

    if (!user) {
        return res.status(400).json({
        message: "Use not found"
        })
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(400).json({
            message: "Invalid password or email"
        })
    }

    const token = jwt.sign({
        id: user._id,
        email: user.email,
    },
        'shhhhhh',
    {
        expiresIn:'24h'
    });

    const options = {
        httpOnly: true,
        secure: true
    }

    res.status(200)
    .cookie("token", token, options)
    .json({
        message: "User logged in",
        success: true,
        user:{
            id: user._id,
            name: user.name,
            role: user.role
        }
    })


  } catch (error) {
    res.status(500).json({
        message: "someting went wrong while login"
    })
  }
}

const logoutUser = async (req, res) => {
  await User.findById(req.user.id)

    const options = {
        httpOnly: true,
        secure: true
    }

    res
    .status(200)
    .clearCookie("token", options)
    .json({
        message: "User loggedout successfully"
    })

}

export { registerUser, 
        varifyUser,
        loginUser,
        logoutUser };
