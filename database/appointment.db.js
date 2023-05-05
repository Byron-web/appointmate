const Appointment = require("../models/appointment.model");

exports.getAllAppointments_async = async () => {
  return await Appointment.find();
};

exports.createAppointment_async = async (todo) => {
  return await new Appointment(todo).save();
};

exports.updateAppointment_async = async (id, todo) => {
  return await Appointment.findByIdAndUpdate(id, todo);
};

exports.deleteAppointmentById_async = async (id) => {
  return await Appointment.findByIdAndDelete(id);
};
