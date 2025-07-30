import { UserModel } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import crypto from 'crypto'
import { generateTokenAndSetCookies } from './../utils/generateTokenandSetCookies.js';
import { generateMail, sendResetEmail, sendResetSuccessMail, sendWelcomeEmail } from "../mailTrap/email.js";
import { error } from "console";

export const signUp = async(req,res)=>{
    const {email,password,name}  = req.body;

    if(!email || !password || !name){
        return res.status(400).json({success : false,error : "All fields are required."});
    }

    try {
        const user = await UserModel.findOne({ email: email });

        if (user) {
          return res.status(400).json({success : false, error: "User Alredy Exists." });
        }

       const hashedPassword =  await bcryptjs.hash(password,10);
       const verificationCode = Math.floor(
         100000 + Math.random() * 900000
       ).toString();

        const newUser = new UserModel({
          email,
          password : hashedPassword,
          name,
          verificationToken : verificationCode,
          verificationTokenExpriesAt : Date.now() + 24 * 60 * 60*1000,
        });

        await newUser.save();
        generateTokenAndSetCookies(res,newUser._id)

        await generateMail(email,verificationCode);

        res.status(201).json({success : true,user : {
            ...newUser._doc,
            password : undefined,
        },message : "The User Created sucessfully."});

    } catch (error) {
        console.log(error);
        res.status(501).json({error : "Internal Server Error ."});
    }
    
}

export const Login = async(req,res)=>{
    const {email,password} = req.body;

    try {
        const user  = await UserModel.findOne({email});

        if(!user){
            return res.status(400).json({success : false,error : "Invalid Credentials.."});
        }

        const checkPassword = await bcryptjs.compare(password,user.password);

        if(!checkPassword){
            return res
              .status(400)
              .json({ success: false, error: "Invalid Credentials.." });
        }

        generateTokenAndSetCookies(res,user._id);

        user.lastLogin  = new Date

        await user.save();

        res.status(200).json({success : true,message : "Login Successfull",user : {
            ...user._doc,
            password : undefined
        }});

    } catch (error) {
        console.log(error);
        res.status(501).json({error : "Internal Server Error"});
    }
}

export const Logout = async(req,res)=>{
    res.clearCookie("jwt");
    res.status(200).json({success : true,message : "User Logged Out Successfully."});
}

export const verifyEmail = async(req,res) =>{
    const {userCode} = req.body;
    
    try {
        const user = await UserModel.findOne({
            verificationToken : userCode,
            verificationTokenExpriesAt : {'$gt' : Date.now()}, 
        });

        if(!user){
            return res.status(400).json({success : false,error : "Invalid Code"});
        }

        user.isVerified = true;
        user.verificationToken = undefined
        user.verificationTokenExpriesAt = undefined

        await user.save();

        await sendWelcomeEmail(user.email,user.name);

        res.status(201).json({success : true,message : "Your are Verified Sucessfully.",user : {
            ...user._doc,
            password : undefined
        }});

    } catch (error) {
        console.log(error);
        res.status(501).json({error : "Internal Server Error."});
    }
}

export const forgotPassword  = async (req,res) =>{
    const {email} = req.body;

    try {
        const user  = await UserModel.findOne({email})
        if(!user){
            return res.status(400).json({success : false,error : "Invalid credetntials."});
        }

        const resetToken = crypto.randomBytes(20).toString("hex");
        user.resetPaswordToken = resetToken
        user.resetPasswordExpriesAt = new Date(Date.now() + 1 * 60 * 60 *1000);

        await user.save();

        await sendResetEmail({
            email : user.email,
            resetUrl:`${process.env.CLIENT_URL}/reset-token/${resetToken}`
        });

        res.status(200).json({success : true,message : "Successfully Sent the reset email."})

    } catch (error) {
        console.log(error)
        res.status(500).json({error : "Interal Server Error.",success : false})
    }
}

export const resetPassword = async(req,res)=>{
    const {token} = req.params;
    const {password } = req.body;
    try {
        
        const user  =  await UserModel.findOne({
            resetPaswordToken : token,
            resetPasswordExpriesAt : {"$gt" : Date.now()},
        });
        
        if(!user){
            return res.status(400).json({success : false,message : "Invalid Credentials."});
        }

        user.password = password;

        await user.save();

       await sendResetSuccessMail(user.email);

       res.status(200).json({success : true,message : "Succes in sending the email."});
    } catch (error) {
        console.log(error)
        res.status(501).json({error : "Error in seding the sucessfull mail.",success : false});
    }
}

export const checkAuth = async(req,res) => {
    try {
        const userId  = req.userId;       
        const user = await UserModel.findOne({_id : userId});
        if(!user){
            return res.status(400).json({error : "Invalid token."});
        }
        res.status(200).json({success : true,user : {
            ...user._doc,
            password : undefined
        }});
        
    } catch (error) {
        console.log(error);
        res.status(501).json({error : "Internal Server Error."})
    }
}