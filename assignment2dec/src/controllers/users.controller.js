const express = require("express");
        // const transporter = require("../configs/mail");
        // const sendMail = require("../utils/sendmail");
        const User = require("../models/user.model");

        const {body,validationResult} = require("express-validator");

        const router = express.Router();
        
        //users crud
        router.post("",
        body("first_name").isLength({min:1}).withMessage("first_name is required"),
        body("last_name").isLength({min:1}).withMessage("first_name is required"),
        body("email").isEmail().withMessage("email is required"),
        body("pincode").custom((value)=>{
            const isNumb = /^[0-9]*$/.test(value);
            if(!isNumb || value.toString().length!=6){
                throw new Error("Pincode must be exactly 6 digits");
            }
            return true;
        }),
        body("age").custom((value)=>{
            const isNumber = /^[0-9]*$/.test(value);
            if(!isNumber || value<=0 || value>100){
                throw new Error("Age must be between 0 and 100");
            }
            return true;
        }),
        body("gender").custom((value)=>{
            if (value!="Male" && value!="Female" && value!="Others"){
                throw new Error("Gender must be Male,Female or Others");
            }
            return true;
        }),
        async (req, res)=>{
            
                const errors = validationResult(req);
                if(!errors.isEmpty()){
                    let newErrors = errors.array().map(({ msg, param, location})=>{
                       return {
                           [param]: msg,
                       }; 
                    });
                
            
                return res.status(400).json({ errors: newErrors });
            }
            try {
                const user = await User.create(req.body);
                return res.status(201).send(user);
            } catch(e){
                return res.status(500).json({ message:e.message, status: "Failed"});
            }
        });
        
        router.get("", async (req, res)=>{
            try {
                const page = +req.query.page || 1;
                 const size = +req.query.limit || 2;
                 const offset = (page - 1)*size;
                  const users = await User.find({}).skip(offset).limit(size).lean().exec();
                  const totalPages = Math.ceil(await User.find({}).countDocuments().lean().exec()/size);
                    return res.send({data:{users,totalPages}});
            } catch(e){
                return res.status(500).json({message:e.message, status: "Failed"});
            }
        });
        
        router.get("/:id", async (req, res)=>{
            try {
                const user = await User.findById(req.params.id).lean().exec();
        
                return res.send(user);
            } catch(e){
                return res.status(500).json({message:e.message, status: "Failed"});
            }
        });
        
        router.patch("/:id", async (req, res)=>{
            try {
                const user = await User.findByIdAndUpdate(req.params.id, req.body, {
                    new: true,
                }).lean().exec();
        
                return res.status(201).send(user);
            } catch(e){
                return res.status(500).json({message:e.message, status: "Failed"});
            }
        });
        
        router.delete("/:id", async (req, res)=>{
            try {
                const user = await User.findByIdAndDelete(req.params.id).lean().exec();
        
                return res.status(201).send(user);
            } catch(e){
                return res.status(500).json({message:e.message, status: "Failed"});
            }
        });
        
        module.exports = router;