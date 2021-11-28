const mongoose = require("mongoose");
const topicSchema = new mongoose.Schema(
    {
      topic_name : { type: String, required: true },
      topic_body : { type: String, required: false },
    },
    {
      versionKey :false,
      timestamps: true,
    }
    );
module.exports = mongoose.model("topic",topicSchema);