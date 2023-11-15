const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/keys");

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
      const user = await User.findById({_id: req.user._id});
      res.send(user);
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = UserController;
