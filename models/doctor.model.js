const mongoose = require("mongoose");
const { model } = require("mongoose");

const DoctorSchema = new mongoose.Schema({
  userId: {
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
  degree: {
    type: String,
    required: true,
  },
  practiceNumber: {
    type: String,
    required: true,
  },
});

module.exports = model("doctor", DoctorSchema);
