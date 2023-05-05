const mongoose = require("mongoose");
const { model } = require("mongoose");

//User Doctor Schema
const DoctorSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobileNo: {
    type: String,
    required: true,
  },
});

module.exports = model("doctor", DoctorSchema);
