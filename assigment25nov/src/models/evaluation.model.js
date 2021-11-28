const mongoose = require("mongoose");
const evaluationSchema = new mongoose.Schema(
    {
      date_of_evaluation : { type: String, required: true },
      marks : { type: Number, required: true },
      instructor :{
         type : mongoose.Schema.Types.ObjectId,
         ref : "user",
         required : true,
      },
      topic_id :{
         type : mongoose.Schema.Types.ObjectId,
         ref : "topic",
         required : true,
      },
      student_id :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "student",
        required : true,
     },
    },
    {
      versionKey :false,
      timestamps: true,
    }
    );
module.exports = mongoose.model("evaluation",evaluationSchema);