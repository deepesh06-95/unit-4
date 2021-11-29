const express = require("express");

const Company = require("../models/company.model");

const router = express.Router();

//companys crud
router.post("", async (req, res)=>{
    try {
        const company = await Company.create(req.body);

        return res.status(201).send(company);
    } catch(e){
        return res.status(500).json({message, status: "Failed"});
    }
});

router.get("", async (req, res)=>{
    try {
        const companys = await Company.find().lean().exec();

        return res.send({companys});
    } catch(e){
        return res.status(500).json({message, status: "Failed"});
    }
});

router.get("/mostopen", async (req, res)=>{
    try {
        const companys = await Company.find().populate("job_id").sort({"openings":-1}).lean().exec();

        return res.send(companys[0]);
    } catch(e){
        return res.status(500).json({message, status: "Failed"});
    }
});

router.get("/:id", async (req, res)=>{
    try {
        const company = await Company.findById(req.params.id).lean().exec();

        return res.send(company);
    } catch(e){
        return res.status(500).json({message, status: "Failed"});
    }
});

router.patch("/:id", async (req, res)=>{
    try {
        const company = await Company.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        }).lean().exec();

        return res.status(201).send(company);
    } catch(e){
        return res.status(500).json({message, status: "Failed"});
    }
});

router.delete("/:id", async (req, res)=>{
    try {
        const company = await Company.findByIdAndDelete(req.params.id).lean().exec();

        return res.status(201).send(company);
    } catch(e){
        return res.status(500).json({message, status: "Failed"});
    }
});


module.exports = router;