const mongoose = require("mongoose");
const { model } = require("mongoose");
const moment = require("moment");

//Appointment Model Schema
const AppointmentSchema = new mongoose.Schema({
  doctorId: {
    type: String,
    required: true,
  },
  patientId: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    set: function (date) {
      return moment(date, "YYYY-MM-DD HH:mm:ss.SSS").toDate();
    },
  },
  status: {
    type: String,
    required: true,
  },
});

module.exports = model("appointment", AppointmentSchema);
