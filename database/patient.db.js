const Patient = require("../models/patient.model");

// Retrieve all patients from the database.
exports.getAllPatient_async = async () => {
  return await Patient.find();
};

// Create a new patient.
exports.createPatient_async = async (patient) => {
  return await new Patient(patient).save();
};

// Update a patient by ID.
exports.updatePatient_async = async (id, patient) => {
  return await Patient.findByIdAndUpdate(id, patient);
};

// Delete a patient by ID
exports.deletePatientById_async = async (id) => {
  await Patient.findByIdAndDelete(id);
};
