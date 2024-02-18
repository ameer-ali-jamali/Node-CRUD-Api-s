const mongoose = require("mongoose");

const UserModel = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
    },
    phone: {
      type: String,
    },
    password: {
      type: String,
    },
    profilePic: {
      type: String,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);

const User = mongoose.model("User", UserModel);
module.exports = User;
