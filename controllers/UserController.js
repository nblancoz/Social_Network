const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwt_secret = process.env.JWT_SECRET;

const UserController = {
  async create(req, res, next) {
    try {
      req.body.role = "user";
      const password = bcrypt.hashSync(req.body.password, 10);
      const user = await User.create({ ...req.body, password });
      res.status(201).send({ message: "User created succesfully", user });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  async login(req, res) {
    try {
      const user = await User.findOne({
        email: req.body.email,
      });
      const token = jwt.sign({ _id: user._id }, jwt_secret);
      if (user.tokens.length > 4) user.tokens.shift();
      user.tokens.push(token);
      await user.save();
      res.send({ message: "Welcome " + user.name, token });
    } catch (error) {
      console.error(error);
      res.status(500).send({ msg: "Unexpected error doing the login", error });
    }
  },
  async logout(req, res) {
    try {
      const user = await User.findByIdAndUpdate(req.params._id, {
        $pull: { tokens: req.headers.authorization },
      });
      res.send({ message: "See you soon " + user.name });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Unexpected error doing the logout", error });
    }
  },
  async getAll(req, res) {
    try {
      const users = await User.find();
      res.send(users);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ msg: "Unexpected error showing the users", error });
    }
  },
  async delete(req, res) {
    try {
      await User.findByIdAndDelete({
        _id: req.params._id,
      });
      res.status(200).send("User deleted succesfully");
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ msg: "Unexpected error deleting the user", error });
    }
  },
  async getInfo(req, res) {
    try {
      const user = await User.findById({ _id: req.user._id }).populate("likes");
      res.send(user);
    } catch (error) {
      console.error(error);
    }
  },
  async follow(req, res) {
    try {
      let loggedUser = await User.findById({ _id: req.user._id });
      let userToFollow = await User.findById({ _id: req.params._id });
      if (loggedUser.following.includes(userToFollow._id)) {
        res.status(400).send(`You're already following ${userToFollow.name}`);
      } else {
        loggedUser = await User.findByIdAndUpdate(
          req.user._id,
          { $push: { following: req.params._id } },
          { new: true }
        );
        userToFollow = await User.findByIdAndUpdate(req.params._id, {
          $push: { followers: req.user._id },
        });
      }
      res.status(200).send(`Now you're following ${userToFollow.name}`);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ msg: "Unexpected error following this user", error });
    }
  },
  async unfollow(req, res) {
    try {
      let loggedUser = await User.findById({ _id: req.user._id });
      let userToUnfollow = await User.findById({ _id: req.params._id });
      if (!loggedUser.following.includes(userToUnfollow._id)) {
        res.status(400).send(`You're not following ${userToUnfollow.name}`);
      } else {
        loggedUser = await User.findByIdAndUpdate(
          req.user._id,
          { $pull: { following: req.params._id } },
          { new: true }
        );
        userToUnfollow = await User.findByIdAndUpdate(req.params._id, {
          $pull: { followers: req.user._id },
        });
      }
      res.status(200).send(`You've unfollow ${userToUnfollow.name}`);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ msg: "Unexpected error following this user", error });
    }
  },
  async searchByName(req, res) {
    try {
      const user = await User.findOne({name: req.params.name})
      if (!user) {
        return res.status(404).send(`User ${req.params.name} not found`)
      }
      res.send(user)
    } catch (error) {
      console.error(error)
      res.status(500).send({msg: "Unexpected error looking for this user", error})
    }
  }
};

module.exports = UserController;
