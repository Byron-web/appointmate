const db = require("../database/db");

//Retrieves all doctors
exports.getAllDoctors = async (req, res) => {
  try {
    var doctor = await db.doctors.getAllDoctors_async();
    if (!doctor || doctor.length <= 0) {
      return res.status(204).send();
    }
    return res.send(doctor);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err: "Failed to find all doctor" });
  }
};

//Create a new doctor account
exports.createDoctor = async (req, res) => {
  try {
    var id = await db.doctors.createDoctor_async(req.body);
    return res.send(id);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err: "Failed to create doctor" });
  }
};

//update a doctor account
exports.updateDoctor = async (req, res) => {
  try {
    var doctor = await db.doctors.updateDoctor_async(req.params.id, req.body);
    return res.send(doctor.id);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ err: `Failed to update doctor by id: [${req.params.id}]` });
  }
};

//delete a doctor account
exports.deleteDoctor = async (req, res) => {
  try {
    await db.doctors.deleteDoctorById_async(req.params.id);
    return res.status(204).send();
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ err: `Failed to delete doctor by id: [${req.params.id}]` });
  }
};
