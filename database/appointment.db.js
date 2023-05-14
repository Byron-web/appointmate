const Appointment = require("../models/appointment.model");

// Retrieve all appointments from the database.
exports.getAllAppointments_async = async () => {
  return await Appointment.find();
};

// Create a new appointment
exports.createAppointment_async = async (todo) => {
  return await new Appointment(todo).save();
};

// Update an appointment by ID.
exports.updateAppointment_async = async (id, todo) => {
  return await Appointment.findByIdAndUpdate(id, todo);
};

// Delete an appointment by ID.
exports.deleteAppointmentById_async = async (id) => {
  return await Appointment.findByIdAndDelete(id);
};
