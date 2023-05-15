const Appointment = require("../models/appointment.model");

// Retrieve all appointments from the database.
exports.getAllAppointments_async = async () => {
  return await Appointment.find();
};

// Create a new appointment
exports.createAppointment_async = async (appointment) => {
  return await new Appointment(appointment).save();
};

// Update an appointment by ID.
exports.updateAppointment_async = async (id, appointment) => {
  return await Appointment.findByIdAndUpdate(id, appointment);
};

// Delete an appointment by ID.
exports.deleteAppointmentById_async = async (id) => {
  return await Appointment.findByIdAndDelete(id);
};
