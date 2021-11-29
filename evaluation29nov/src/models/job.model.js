const mongoose = require("mongoose");

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
module.exports = mongoose.model("job",jobSchema);