const Comment = require("../models/Comment");
const Post = require("../models/Post");

const CommentController = {
  async create(req, res) {
    try {
      const comment = await Comment.create({
        ...req.body,
        userId: req.user._id,
        postId: req.params.postId,
      });
      await Post.findByIdAndUpdate(
        req.params.postId,
        { $push: { commentIds: comment._id } },
        {
          new: true,
        }
      );
      res.status(201).send({ msg: "Comment created successfully", comment });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ msg: "Unexpected error creating the comment", error });
    }
  },
  async getAll(req, res) {
    try {
      const comments = await Comment.find().populate("postId");
      res.send(comments);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ msg: "Unexpected error looking for the comments", error });
    }
  },
  async delete(req, res) {
    try {
      await Comment.findByIdAndDelete(req.params._id);
      res.send("Comment deleted successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send({ msg: "Unexpected error deleting the comment" });
    }
  },
  async update(req, res) {
    try {
      const comment = await Comment.findByIdAndUpdate(
        req.params._id,
        { ...req.body },
        {
          new: true,
        }
      );
      res.send({ msg: "Comment updated succesfully", comment }); // ERROR
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ msg: "Unexpected error updating the comment", error });
    }
  },
};

module.exports = CommentController;
