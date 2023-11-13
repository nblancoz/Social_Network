const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/config.json")["development"];

const UserController = {
  async register(req, res) {
    try {
      const user = await User.create(req.body);
      res.status(201).send({ message: "Usuario registrado con exito", user });
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = UserController;