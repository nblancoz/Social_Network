const User = require("../models/User");
const Post = require("../models/Post");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/keys.js");

const authentication = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const payload = jwt.verify(token, jwt_secret);
    const user = await User.findOne({ _id: payload._id, tokens: token });
    const postId = req.params.postId;
    const post = await Post.findById(postId);

    if (!user) {
      return res.status(401).send({ message: "First you need to login" });
    }
    if (!post) {
      return res.status(404).send({ msg: "Post not found" });
    }
    req.user = user;
    req.post = post;
    next();
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ error, message: "Unexpected error with the token" });
  }
};

const isAdmin = async (req, res, next) => {
  const admins = ["admin", "superadmin"];
  if (!admins.includes(req.user?.role)) {
    return res.status(403).send({
      message: "You're not authorized'",
    });
  }
  next();
};

const isAuthor = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params._id);
    if (post.userId.toString() !== req.user._id.toString()) {
      return res.status(403).send({ message: "You don't own this post" });
    }
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      error,
      message: "Unexpected error comproving the authority of the post",
    });
  }
};

module.exports = { authentication, isAdmin, isAuthor };
