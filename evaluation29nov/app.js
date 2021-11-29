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

const app = express();

app.use(express.json());

app.listen(2550, async function(){
    await connect();
    console.log("listening on port 2550");
});