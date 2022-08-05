const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  content: { type: String },
  doc: { type: mongoose.Schema.Types.ObjectId, refPath: "docModel" },
  docModel: {
    type: String,
    enum: ["Review", "Post"],
    required: true,
  },
},{timestamps:true});

const Comment = mongoose.model("Comment", commentSchema, "Comment");
module.exports = Comment;
