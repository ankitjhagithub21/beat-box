const User = require("../models/userModel");
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = async(req,res) => {
    try{

        const {fullName,email,password} = req.body;

        if(!fullName || !email || !password){
            return res.status(400).json({success:false,message:"All fields are required."})
        }

        const emailExist = await User.findOne({email})

        if(emailExist){
            return res.status(400).json({success:false,message:"User already exist with this email."})
        }


        //validate email

        if(!validator.isEmail(email)){
            return res.status(400).json({success:false,message:"Please enter correct email address."})
        }


        if(!validator.isStrongPassword(password)){
            return res.status(400).json({success:false,message:"Please enter strong password."})
        }
        
        const hashedPassword = await bcrypt.hash(password,10);

    
        const newUser = new User({
            fullName,
            email,
            password:hashedPassword
        });

        await newUser.save();

        const token = jwt.sign({id:newUser._id},process.env.JWT_SEC,{expiresIn:"1d"});



        return res.cookie('token',token,{
            httpOnly:true,
            secure:true,
            sameSite:"none",
            maxAge:1*24*60*60*1000
        }).json({success:true,message:"User registered successfully.",user:{
            fullName:newUser.fullName,
            email:newUser.email
        }})
        

        
        
        
    }catch(error){
        res.status(500).json({success:false,message:error.message})
    }
}

const login = async(req,res) => {
    try{
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({success:false,message:"All fields are required."})
        }

        const loggedInUser = await User.findOne({email});

        if(!loggedInUser){
            return res.status(400).json({success:false,message:"User not exist."})
        }
        

        const isValidPassword = await bcrypt.compare(password,loggedInUser.password);

        if(!isValidPassword){
            return res.status(400).json({success:false,message:"Wrong email or password."})
        }

        const token = jwt.sign({id:loggedInUser._id},process.env.JWT_SEC,{expiresIn:"1d"});

        return res.cookie('token',token,{
            httpOnly:true,
            secure:true,
            sameSite:"none",
            maxAge:1*24*60*60*1000
        }).json({success:true,message:"Login successfull.",user:{
            fullName:loggedInUser.fullName,
            email:loggedInUser.email
        }})
        

        
    }catch(error){
        res.status(500).json({success:false,message:error.message})
    }
}

const getUser = async(req,res) => {
    try{
        const user = await User.findById(req.userId).select("-password");

        if(!user){
            return res.status(404).json({success:false,message:"User not found."})
        }

        res.status(200).json({success:true,user})
        
    }catch(error){
        res.status(500).json({success:false,message:error.message})
    }
}

const logout = async(req,res) => {
    try{

        return res.cookie('token','',{
            httpOnly:true,
            secure:true,
            sameSite:"strict",
            maxAge:0
        }).json({success:true,message:"Logout successfull."})
        
        
    }catch(error){
        res.status(500).json({success:false,message:error.message})
    }
}


module.exports = {
    register,
    login,
    getUser,
    logout
}