const Comment = require("../models/Comment");

const CommentController = {
  async create(req, res) {
    try {
      const comment = await Comment.create(req.body);
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
      const comments = await Comment.find();
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
};

module.exports = CommentController;
