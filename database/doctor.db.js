const Doctor = require("../models/doctor.model");

exports.getAllDoctors_async = async () => {
  return await Doctor.find();
};

exports.createDoctor_async = async (doctor) => {
  return await new Doctor(doctor).save();
};

exports.updateDoctor_async = async (id, doctor) => {
  return await Doctor.findByIdAndUpdate(id, doctor);
};

exports.deleteDoctorById_async = async (id) => {
  await Doctor.findByIdAndDelete(id);
};
