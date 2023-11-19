const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwt_secret = process.env.JWT_SECRET;
const transporter = require("../config/nodemailer");

const UserController = {
  async create(req, res, next) {
    try {
      req.body.role = "user";
      req.body.verified = false;
      const password = bcrypt.hashSync(req.body.password, 10);
      const user = await User.create({ ...req.body, password });
      res.status(201).send({
        message:
          "User created succesfully, please checkout your inbox and verify your email",
        user,
      });
      const emailToken = jwt.sign({ email: req.body.email }, jwt_secret, {
        expiresIn: "48h",
      });
      const url = "https://localhost:8080/users/confirm/" + emailToken;
      await transporter.sendMail({
        to: req.body.email,
        subject: "Confirm your register",
        html: `<h3>Welcome, you are one step away from registering</h3>
        <a href="${url}">Click here to complete the register</a>`,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  async confirm(req, res) {
    try {
      const token = req.params.emailToken;
      const payload = jwt.verify(token.jwt_secret);
      const confirmedUser = await User.findOneAndUpdate(
        { email: payload.email },
        { verified: true },
        { new: true }
      );
      res.send(confirmedUser);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({
          msg: " Unexpected error sending the verification email",
          error,
        });
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
      // if (!user.verified) {
      //   return res.status(400).send({ message: "You need to verify your email first" });
      // }
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
      const user = await User.findById({ _id: req.user._id })
        .populate("likes")
        .populate("postIds");
      const followersCount = user.followers.length;
      const followingCount = user.following.length;
      user.followers.push(followersCount);
      user.following.push(followingCount);
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
      const user = await User.findOne({ name: req.params.name });
      if (!user) {
        return res.status(404).send(`User ${req.params.name} not found`);
      }
      res.send(user);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ msg: "Unexpected error looking for this user", error });
    }
  },
  async searchById(req, res) {
    try {
      const user = await User.findById(req.params._id);
      if (!user) {
        return res.status(404).send("User with this id not found");
      }
      res.send(user);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ msg: "Unexpected error looking for this user", error });
    }
  },
};

module.exports = UserController;
