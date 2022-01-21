
        const express = require("express");
        const User = require("../models/user.model");
        
        const upload = require("../middlewares/upload");//importing middleware->upload

        const router = express.Router();
        
        //users crud
        router.post("/", upload.single("profileImages"), async (req, res)=>{ //profileImages->key...single->can only upload only one file at a time
            try {
                const user = await User.create(
                    {
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        profile_pic: req.file.path,
                    }
                );
                return res.status(201).json({user});
            } catch(e){
                return res.status(500).json({ message:e.message, status: "Failed"});
            }
        });
        
        router.post("/multiple", upload.any("profileImages"), async (req, res)=>{ //profileImages->key...any->can upload many files at a time
           const filePaths = req.files.map(file => file.path); //filePaths is an array and putting individual paths inside it
            try {
                const user = await User.create(
                    {
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        profile_pic: filePaths,
                    }
                );
                return res.status(201).json({user});
            } catch(e){
                return res.status(500).json({ message:e.message, status: "Failed"});
            }
        });

        router.get("/", async (req, res)=>{
            try {
                const user = await User.find().lean().exec();
        
                return res.send(user);
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