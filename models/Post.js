const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const PostSchema = new mongoose.Schema(
  {
    name:{
      type: String,
      required: true
    },
    body:{
      type: String,
      required: true
    },
    userId: {
      type: ObjectId,
      ref: "User",
    },
    commentIds:{
      type:String,
      ref:"Comment",
      required: true
    },
    datePosted: Date,
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;