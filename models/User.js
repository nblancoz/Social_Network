const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please insert your name"],
    },
    email: {
      type: String,
      match: [/.+\@.+\..+/, "Email not valid"],
      unique: true,
      required: [true, "Please insert your email"],
    },
    password: {
      type: String,
      required: [true, "Please insert your password"],
    },
    role: String,
    tokens: [],
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
