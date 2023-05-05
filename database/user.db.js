const User = require("../models/user.model");

exports.getAllUsers_async = async () => {
  return await User.find();
};

exports.createUser_async = async (user) => {
  return await new User(user).save();
};

exports.updateUser_async = async (id, user) => {
  return await User.findByIdAndUpdate(id, user);
};

exports.deleteUserById_async = async (id) => {
  await User.findByIdAndDelete(id);
};
