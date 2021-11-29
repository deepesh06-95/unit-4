const express = require("express");
const mongoose = require("mongoose");

const connect = ()=>{
    return mongoose.connect("mongodb://127.0.0.1:27017/naukri");
};

//creating schemas & models
//user schema
const userSchema = new mongoose.Schema(
    {
        first_name : { type: String, required: true},
        last_name : { type: String, required: false},
        email : { type: String, required: true, unique: true},
    },
    {
        versionKey :false,
        timestamps: true,
    }
);
const User = mongoose.model("user",userSchema);

//company schema
const companySchema = new mongoose.Schema(
    {
        company_name : { type: String, required: true},
        openings : { type: Number, required: false},
        user_id : { 
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true
        },
        job_id : { 
            type: mongoose.Schema.Types.ObjectId,
            ref: "job",
            required: true
        },
    },
    {
        versionKey :false,
        timestamps: true,
    }
);
const Company = mongoose.model("company",companySchema);

//job schema
const jobSchema = new mongoose.Schema(
    {
        job_name : { type: String, required: true},
        rating : { type: Number, required: false},
        notice_period : { type: String, required: true},
        work_from_home : { type: String, required: true},
        city : { type: String, required: true},
        skill_id : { 
            type: mongoose.Schema.Types.ObjectId,
            ref: "skill",
            required: true
        },
    },
    {
        versionKey :false,
        timestamps: true,
    }
);
const Job = mongoose.model("job",jobSchema);

//skill schema
const skillSchema = new mongoose.Schema(
    {
        skill_name : { type: String, required: true},
    },
    {
        versionKey :false,
        timestamps: true,
    }
);
const Skill = mongoose.model("skill",skillSchema);

const app = express();

app.use(express.json());

//crud operation
//users crud
app.post("/users", async (req, res)=>{
    try {
        const user = await User.create(req.body);

        return res.status(201).send(user);
    } catch(e){
        return res.status(500).json({message, status: "Failed"});
    }
});

app.get("/users", async (req, res)=>{
    try {
        const users = await User.find().lean().exec();

        return res.send({users});
    } catch(e){
        return res.status(500).json({message, status: "Failed"});
    }
});

app.get("/users/:id", async (req, res)=>{
    try {
        const user = await User.findById(req.params.id).lean().exec();

        return res.send(user);
    } catch(e){
        return res.status(500).json({message, status: "Failed"});
    }
});

app.patch("/users/:id", async (req, res)=>{
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        }).lean().exec();

        return res.status(201).send(user);
    } catch(e){
        return res.status(500).json({message, status: "Failed"});
    }
});

app.delete("/users/:id", async (req, res)=>{
    try {
        const user = await User.findByIdAndDelete(req.params.id).lean().exec();

        return res.status(201).send(user);
    } catch(e){
        return res.status(500).json({message, status: "Failed"});
    }
});

//companys crud
app.post("/companys", async (req, res)=>{
    try {
        const company = await Company.create(req.body);

        return res.status(201).send(company);
    } catch(e){
        return res.status(500).json({message, status: "Failed"});
    }
});

app.get("/companys", async (req, res)=>{
    try {
        const companys = await Company.find().lean().exec();

        return res.send({companys});
    } catch(e){
        return res.status(500).json({message, status: "Failed"});
    }
});

app.get("/companys/:id", async (req, res)=>{
    try {
        const company = await Company.findById(req.params.id).lean().exec();

        return res.send(company);
    } catch(e){
        return res.status(500).json({message, status: "Failed"});
    }
});

app.patch("/companys/:id", async (req, res)=>{
    try {
        const company = await Company.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        }).lean().exec();

        return res.status(201).send(company);
    } catch(e){
        return res.status(500).json({message, status: "Failed"});
    }
});

app.delete("/companys/:id", async (req, res)=>{
    try {
        const company = await Company.findByIdAndDelete(req.params.id).lean().exec();

        return res.status(201).send(company);
    } catch(e){
        return res.status(500).json({message, status: "Failed"});
    }
});

app.listen(2550, async function(){
    await connect();
    console.log("listening on port 2550");
});