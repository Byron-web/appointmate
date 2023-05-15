const db = require("../database/db");
const moment = require("moment");

//Gets all appointments, checks for certain conditions. If all conditons are satisfied then proceeds to retrieve data and sends a 204, else sends a 500 and error message.
exports.getAllAppointments = async (req, res) => {
  try {
    var appointments = await db.appointments.getAllAppointments_async();
    if (!appointments || appointments.length <= 0) {
      return res.status(204).send();
    }
    return res.send(appointments);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err: "Failed to find all appointments" });
  }
};

//Gets all appointments for a doctor, checks for certain conditions. If all conditons are satisfied then proceeds to retrieve data and sends a 204, else sends a 500 and error message.
exports.getAllAppointmentsByDoctor = async (req, res) => {
  try {
    var doctor = req.params.id;
    var appointments = await db.appointments.getAllAppointments_async();
    if (!appointments || appointments.length <= 0) {
      return res.status(204).send();
    }
    var filteredAppointments = appointments.filter(
      (x) => x.doctorId === doctor
    );
    return res.send(filteredAppointments);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err: "Failed to find all appointments" });
  }
};

//Gets all appointments for a patient, checks for certain conditions. If all conditons are satisfied then proceeds to retrieve data and sends a 204, else sends a 500 and error message.
exports.getAllAppointmentsByPatient = async (req, res) => {
  try {
    const patientId = req.params.id;
    const appointments = await db.appointments.getAllAppointments_async();

    if (!appointments || appointments.length <= 0) {
      return res.status(204).send();
    }

    // Filter appointments based on the 2-hour window
    const currentTime = moment();
    const twoHoursAhead = currentTime.clone().add(2, "hours");

    const filteredAppointments = appointments.filter((appointment) => {
      const appointmentTime = moment(appointment.date);
      return appointmentTime.isBefore(twoHoursAhead);
    });

    return res.send(filteredAppointments);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err: "Failed to find all appointments" });
  }
};

//Creates a appointment if all conditions are met, otherwise sends an error message and a 500.
exports.createAppointment = async (req, res) => {
  try {
    var id = await db.appointments.createAppointment_async(req.body);
    return res.send(id);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err: "Failed to create appointment" });
  }
};

//Updates an appointment by its id, otherwise sends a 500 and an error message.
exports.updateAppointment = async (req, res) => {
  try {
    var appointment = await db.appointments.updateAppointment_async(
      req.params.id,
      req.body
    );
    return res.send(appointment.id);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ err: `Failed to update appointment by id: [${req.params.id}]` });
  }
};

//Deletes an appointment by its id, otherwise sends a 500 and an error message.
exports.deleteAppointment = async (req, res) => {
  try {
    await db.appointments.deleteAppointmentById_async(req.params.id);
    return res.status(204).send();
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ err: `Failed to delete appointment by id: [${req.params.id}]` });
  }
};

// Book a new appointment by patient
exports.bookAppointment = async (req, res) => {
  try {
    const appointment = await db.appointments.createAppointment_async(req.body);
    return res.json({ appointment });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: "Failed to book appointment" });
  }
};
