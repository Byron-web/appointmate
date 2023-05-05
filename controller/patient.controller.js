const db = require("../database/db");

//Retrieve all patient
exports.getAllPatients = async (req, res) => {
  try {
    var patient = await db.patients.getAllPatient_async();
    if (!patient || patient.length <= 0) {
      return res.status(204).send();
    }
    return res.send(patient);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err: "Failed to find all patient" });
  }
};

//Create a new patient
exports.createPatient = async (req, res) => {
  try {
    var id = await db.patients.createPatient_async(req.body);
    return res.send(id);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err: "Failed to create patient" });
  }
};

//Update a patient
exports.updatePatient = async (req, res) => {
  try {
    var patient = await db.patients.updatePatient_async(
      req.params.id,
      req.body
    );
    return res.send(patient.id);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ err: `Failed to update patient by id: [${req.params.id}]` });
  }
};

//Delete a patient
exports.deletePatient = async (req, res) => {
  try {
    await db.patients.deletePatientById_async(req.params.id);
    return res.status(204).send();
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ err: `Failed to delete patient by id: [${req.params.id}]` });
  }
};
