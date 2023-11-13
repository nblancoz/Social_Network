const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;