require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const newToken = (user)=>{
  return jwt.sign({ user: user }, process.env.JWT_ACCESS_KEY);
};

const register = async(req,res)=>{
    // console.log(req.body);
    try{
   //check if the email address provided already exist
   let user = await User.findOne({email: req.body.email}).lean().exec();
   //if it already exist through an error
   if(user) 
   return res
   .status(400)
    .json({
        status:"failed",
        message: "please provide a different email address",
    });

   //else we will create the user //then we will update hash the password as password as plain text password is harmful

   user = await User.create(req.body);
   
   //we will create token
   const token = newToken(user);

   //return the user and the token
      
    res.status(201).json({user, token});
   } catch(e){
    return res.status(500).json({status:"failed",message:e.message});
   }
};

const login = async(req,res) =>{   
    try{
    //check if the email address provided already exist
    let user = await User.findOne({email: req.body.email});
    //if it does not exist then throw an error
    if(!user) 
   return res
   .status(400)
    .json({
        status:"failed",
        message: "please provide correct email address and password",
    });
    //else we match the password
    const match = await user.checkPassword(req.body.password);
    //if not match then throw an error
    if(!match) 
    return res
    .status(400)
     .json({
         status:"failed",
         message: "please provide correct email address and password",
     });
    //if it matches the create the token
    const token = newToken(user);
    //return the user and the token
    res.status(201).json({user, token});
   } catch(e){
    return res.status(500).json({status:"failed",message:e.message});
   }
};

module.exports = { register, login };