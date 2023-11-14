const Post = require("../models/Post");

const PostController = {
  async create(req, res) {
    try {
      const post = await Post.create(req.body);
      res.status(201).send(post);
    } catch (error) {
      console.error(error);
      res.status(500).send({msg: "Unexpected error creating the post", error})
    }
  },
  async update(req, res) {
    try {
      const post = await Post.findByIdAndUpdate(
        req.params._id,
        { ...req.body },
        {
          new: true,
        }
      );
      res.send({ message: "Post updated successfully", post });
    } catch (error) {
      console.error(error);
      res.status(500).send({msg: "Unexpected error updating the post", error})
    }
  },
  async delete(req, res) {
    try {
      const post = await Post.findByIdAndDelete(req.params._id);
      res.send({ message: "Post deleted", post });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Unexpected error deleting the post" });
    }
  },
  async getPostsByName(req, res) {
    try {
      const posts = await Post.find({
        $text: {
          $search: req.params.name,
        },
      });
      if (posts.length < 1) {
        res.status(404).send("Post not found")
      }
      res.send(posts);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ message: "Unexpected error looking for the post" });
    }
  },
  async getById(req, res) {
    try {
      const post = await Post.findById(req.params._id);
      if (post.length < 1) {
        res.status(404).send("Post not found")
      }
      res.send(post);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Unexpected error looking for the post" });
    }
  },
  async getAll(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const posts = await Post.find()
        .limit(limit)
        .skip((page - 1) * limit);
      res.send(posts);
    } catch (error) {
      console.error(error);
      res.status(500).send({msg: "Unexpected error looking for the post", error})
    }
  },
};
module.exports = PostController;
