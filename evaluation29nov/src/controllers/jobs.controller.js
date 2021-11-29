const express = require("express");

const Job = require("../models/job.model");

const router = express.Router();

//jobs crud
router.post("", async (req, res)=>{
    try {
        const job = await Job.create(req.body);

        return res.status(201).send(job);
    } catch(e){
        return res.status(500).json({message, status: "Failed"});
    }
});

router.get("", async (req, res)=>{
    try {
        const jobs = await Job.find().lean().exec();

        return res.send({jobs});
    } catch(e){
        return res.status(500).json({message, status: "Failed"});
    }
});

router.get("/city", async (req, res)=>{
    try {
        const jobs = await Job.find({$and: [{"city":{$eq: "bangalore"}},{"skill_id":{$eq: "61a49bb99d00c26d2d48bb2f"}}]}).populate({path: "skill_id", select: "skill_name"}).lean().exec();

        return res.send({jobs});
    } catch(e){
        return res.status(500).json({message, status: "Failed"});
    }
});

router.get("/work", async (req, res)=>{
    try {
        const jobs = await Job.find({"work_from_home":{$eq: "yes"}}).populate({path: "skill_id", select: "skill_name"}).lean().exec();

        return res.send({jobs});
    } catch(e){
        return res.status(500).json({message, status: "Failed"});
    }
});

router.get("/notice", async (req, res)=>{
    try {
        const jobs = await Job.find({"notice_period":{$eq: "2 months"}}).populate({path: "skill_id", select: "skill_name"}).lean().exec();

        return res.send({jobs});
    } catch(e){
        return res.status(500).json({message, status: "Failed"});
    }
});

router.get("/sort", async (req, res)=>{
    try {
        const jobs = await Job.find().populate({path: "skill_id", select: "skill_name"}).sort({"rating":1}).lean().exec();

        return res.send({jobs});
    } catch(e){
        return res.status(500).json({message, status: "Failed"});
    }
});

router.get("/:id", async (req, res)=>{
    try {
        const job = await Job.findById(req.params.id).lean().exec();

        return res.send(job);
    } catch(e){
        return res.status(500).json({message, status: "Failed"});
    }
});

router.patch("/:id", async (req, res)=>{
    try {
        const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        }).lean().exec();

        return res.status(201).send(job);
    } catch(e){
        return res.status(500).json({message, status: "Failed"});
    }
});

router.delete("/:id", async (req, res)=>{
    try {
        const job = await Job.findByIdAndDelete(req.params.id).lean().exec();

        return res.status(201).send(job);
    } catch(e){
        return res.status(500).json({message, status: "Failed"});
    }
});

module.exports = router;