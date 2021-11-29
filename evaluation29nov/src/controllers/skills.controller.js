const express = require("express");

const Skill = require("../models/skill.model");

const router = express.Router();

//skills crud
router.post("", async (req, res)=>{
    try {
        const skill = await Skill.create(req.body);

        return res.status(201).send(skill);
    } catch(e){
        return res.status(500).json({message, status: "Failed"});
    }
});

router.get("", async (req, res)=>{
    try {
        const skills = await Skill.find().lean().exec();

        return res.send({skills});
    } catch(e){
        return res.status(500).json({message, status: "Failed"});
    }
});

router.get("/:id", async (req, res)=>{
    try {
        const skill = await Skill.findById(req.params.id).lean().exec();

        return res.send(skill);
    } catch(e){
        return res.status(500).json({message, status: "Failed"});
    }
});

router.patch("/:id", async (req, res)=>{
    try {
        const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        }).lean().exec();

        return res.status(201).send(skill);
    } catch(e){
        return res.status(500).json({message, status: "Failed"});
    }
});

router.delete("/:id", async (req, res)=>{
    try {
        const skill = await Skill.findByIdAndDelete(req.params.id).lean().exec();

        return res.status(201).send(skill);
    } catch(e){
        return res.status(500).json({message, status: "Failed"});
    }
});

module.exports = router;