const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

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
    verified: { type: Boolean, default: false },
    password: {
      type: String,
      required: [true, "Please insert your password"],
    },
    role: String,
    tokens: [],
    postIds: [
      {
        type: ObjectId,
        ref: "Post",
      },
    ],
    likes: [{ type: ObjectId, ref: "Post" }],
    followers: [],
    following: [],
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
