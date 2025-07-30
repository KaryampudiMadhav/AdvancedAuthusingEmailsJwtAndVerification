import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    password  : {
        type  : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    isVerified : {
        type  : Boolean,
        required : true,
        default : false
    },
    lastLogin : {
        type : Date,
        default : Date.now()
    },
    resetPaswordToken : String,
    resetPasswordExpriesAt  : Date,
    verificationToken : String,
    verificationTokenExpriesAt : Date,
},{timestamps : true})

export const UserModel  = mongoose.model("users",userSchema)