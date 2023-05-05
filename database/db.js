const userDb = require("./user.db");
const doctorDb = require("./doctor.db");
const patientDb = require("./patient.db");
const appointmentDb = require("./appointment.db");

//db routes are just to abstract the code and make it more modular

exports.users = userDb;
exports.doctors = doctorDb;
exports.patients = patientDb;
exports.appointments = appointmentDb;
