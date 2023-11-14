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

UserSchema.methods.toJSON = function () {
  const user = this._doc;
  delete user.tokens;
  delete user.password;
  return user;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
