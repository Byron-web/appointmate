const Doctor = require("../models/doctor.model");

// Retrieve all doctors from the database.
exports.getAllDoctors_async = async () => {
  return await Doctor.find();
};

// Create a new doctor.
exports.createDoctor_async = async (doctor) => {
  return await new Doctor(doctor).save();
};

// Update a doctor by ID.
exports.updateDoctor_async = async (id, doctor) => {
  return await Doctor.findByIdAndUpdate(id, doctor);
};

// Delete a doctor by ID.
exports.deleteDoctorById_async = async (id) => {
  await Doctor.findByIdAndDelete(id);
};
