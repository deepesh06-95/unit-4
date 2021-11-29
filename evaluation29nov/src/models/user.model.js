const mongoose = require("mongoose");

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
module.exports = mongoose.model("user",userSchema);


