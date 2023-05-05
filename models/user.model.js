const mongoose = require("mongoose");
const { model } = require("mongoose");

//User Model Schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: {
    type: Array,
    required: true,
  },
});

module.exports = model("user", UserSchema);
