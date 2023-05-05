const Patient = require("../models/patient.model");

exports.getAllPatient_async = async () => {
  return await Patient.find();
};

exports.createPatient_async = async (patient) => {
  return await new Patient(patient).save();
};

exports.updatePatient_async = async (id, patient) => {
  return await Patient.findByIdAndUpdate(id, patient);
};

exports.deletePatientById_async = async (id) => {
  await Patient.findByIdAndDelete(id);
};
