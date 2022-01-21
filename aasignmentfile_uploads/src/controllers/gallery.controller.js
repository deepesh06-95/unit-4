
        const express = require("express");
        const Gallery = require("../models/gallery.model");
        
        const upload = require("../middlewares/upload");//importing middleware->upload

        const router = express.Router();
        
       
        router.post("/", upload.single("profileImages"), async (req, res)=>{ //profileImages->key...single->can only upload only one file at a time
            try {
                const gallery = await Gallery.create(
                    {
                        pictures: req.file.path,
                        user_id: req.body.user_id,
                    }
                );
                return res.status(201).json({gallery});
            } catch(e){
                return res.status(500).json({ message:e.message, status: "Failed"});
            }
        });
        
        router.post("/multiple", upload.any('pictures'), async (req, res)=>{ //profileImages->key...any->can upload many files at a time
           const filePaths = req.files.map((file) => file.path); //filePaths is an array and putting individual paths inside it
           if(filePaths.length>5)
           {
            return res.status(201).send("greater than 5");
           }
            try {
                console.log(req.body);
                const gallery = await Gallery.create(
                    {
                        
                        pictures: filePaths,
                        user_id: req.body.user_id,
                    }
                );
                return res.status(201).json({gallery});
            } catch(e){
                return res.status(500).json({ message:e.message, status: "Failed"});
            }
        });

        router.get("/", async (req, res)=>{
            try {
                const gallery = await Gallery.find().lean().exec();
        
                return res.send(gallery);
            } catch(e){
                return res.status(500).json({message:e.message, status: "Failed"});
            }
        });
        
        router.get("/:id", async (req, res)=>{
            try {
                const gallery = await Gallery.findById(req.params.id).lean().exec();
        
                return res.send(gallery);
            } catch(e){
                return res.status(500).json({message:e.message, status: "Failed"});
            }
        });
        
        router.patch("/:id", async (req, res)=>{
            try {
                const gallery = await Gallery.findByIdAndUpdate(req.params.id, req.body, {
                    new: true,
                }).lean().exec();
        
                return res.status(201).send(gallery);
            } catch(e){
                return res.status(500).json({message:e.message, status: "Failed"});
            }
        });
        
        router.delete("/:id", async (req, res)=>{
            try {
                const gallery = await Gallery.findByIdAndDelete(req.params.id).lean().exec();
        
                return res.status(201).send(gallery);
            } catch(e){
                return res.status(500).json({message:e.message, status: "Failed"});
            }
        });
        
        module.exports = router;