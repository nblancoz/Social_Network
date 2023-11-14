const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const PostSchema = new mongoose.Schema(
  {
    name:{
      type: String,
      require: true
    },
    body:{
      type: String,
      require: true
    },
    userId: {
      type: ObjectId,
      ref: "User",
    },
    datePosted: Date,
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;