const User = require("../models/user.model");

// Retrieve all users from the database.
exports.getAllUsers_async = async () => {
  return await User.find();
};

// Create a user by ID.
exports.createUser_async = async (user) => {
  return await new User(user).save();
};

//Update a user by ID.
exports.updateUser_async = async (id, user) => {
  return await User.findByIdAndUpdate(id, user);
};

// Delete a user by ID.
exports.deleteUserById_async = async (id) => {
  await User.findByIdAndDelete(id);
};
