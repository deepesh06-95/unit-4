const mongoose = require("mongoose");

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
module.exports = mongoose.model("company",companySchema);

