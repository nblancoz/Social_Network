const Post = require("../models/Post");

const PostController = {
        async create(req, res) {
          try {
            const post = await Post.create({
              ...req.body,
              // userId: req.user._id, no funciona
            });
            res.status(201).send(post);
          } catch (error) {
            console.error(error);
          }
        },
    }

module.exports = PostController;
