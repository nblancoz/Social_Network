const Post = require("../models/Post");
const User = require("../models/User");

const PostController = {
  async create(req, res) {
    try {
      const post = await Post.create({
        ...req.body,
        userId: req.user._id,
      });
      await User.findByIdAndUpdate(
        req.user._id,
        { $push: { postIds: post._id } },
        {
          new: true,
        }
      );
      res.status(201).send(post);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ msg: "Unexpected error creating the post", error });
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
      res
        .status(500)
        .send({ msg: "Unexpected error updating the post", error });
    }
  },
  async delete(req, res) {
    try {
      const post = await Post.findByIdAndDelete(req.params._id);
      if (!post) {
        return res.status(404).send("Post not found");
      }
      res.send({ message: "Post deleted", post });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Unexpected error deleting the post" });
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
        res.status(404).send("Post not found");
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
        res.status(404).send("Post not found");
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
        .populate("userId")
        .populate("commentIds")
        .limit(limit)
        .skip((page - 1) * limit);
      res.send(posts);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ msg: "Unexpected error looking for the posts", error });
    }
  },
  async like(req, res) {
    try {
      const post = await Post.findByIdAndUpdate(
        req.params._id,
        { $push: { likes: req.user._id } },
        { new: true }
      );
      await User.findByIdAndUpdate(
        req.user._id,
        { $push: { likes: req.params._id } },
        { new: true }
      );
      res.send(post);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "There was a problem with the like" });
    }
  },
};
module.exports = PostController;
