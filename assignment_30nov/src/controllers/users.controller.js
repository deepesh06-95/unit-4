
        const express = require("express");
        const transporter = require("../configs/mail");
        const sendMail = require("../utils/sendmail");
        const User = require("../models/user.model");
        
        const router = express.Router();
        
        //users crud
        router.post("", async (req, res)=>{
            try {
                const user = await User.create(req.body);
        
                sendMail("a@a.com",[user.email,"b@b.com","c@c.com","d@d.com","f@f.com","g@g.com"],`Welcome to ABC system ${user.first_name} ${user.last_name}`,`Hi ${user.first_name}, Please confirm your email address`, "<h1>HTML version of the message</h1>");
                   

                sendMail("a@a.com",["b@b.com","c@c.com","d@d.com","f@f.com","g@g.com"],`${user.first_name} ${user.last_name} has registered with us`,`Please welcome ${user.first_name} ${user.last_name}`, "<h1>HTML version of the message</h1>");
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