const express = require("express");
const router = express.Router();
const appointmentsController = require("../controller/appointment.controller");
const authenticationMiddleware = require("../middleware/authentication.middleware");
const {
  USER_ROLE_ADMIN,
  USER_ROLE_DOCTOR,
  USER_ROLE_PATIENT,
} = require("../constants/roles.constants");

//All the appointment routes used in the app, various roles have access to various routes, there is also middleware that through the process checks various conditions before allowing access to the data of that route.

//Get all appointment route
router.get(
  "/",
  authenticationMiddleware.authenticate,
  authenticationMiddleware.rolePolicy([
    USER_ROLE_ADMIN,
    USER_ROLE_DOCTOR,
    USER_ROLE_PATIENT,
  ]),
  appointmentsController.getAllAppointments
);
//get a doctor by their id route
router.get(
  "/doctor/:id",
  authenticationMiddleware.authenticate,
  authenticationMiddleware.rolePolicy([USER_ROLE_ADMIN, USER_ROLE_DOCTOR]),
  appointmentsController.getAllAppointmentsByDoctor
);
//get a patient by their id route
router.get(
  "/patient/:id",
  authenticationMiddleware.authenticate,
  authenticationMiddleware.rolePolicy([USER_ROLE_ADMIN, USER_ROLE_PATIENT]),
  appointmentsController.getAllAppointmentsByPatient
);
router.post(
  "/",
  //create an appointment route
  authenticationMiddleware.authenticate,
  authenticationMiddleware.rolePolicy([USER_ROLE_ADMIN, USER_ROLE_DOCTOR]),
  appointmentsController.createAppointment
);
//update an appointment route
router.put(
  "/:id",
  authenticationMiddleware.authenticate,
  authenticationMiddleware.rolePolicy([USER_ROLE_ADMIN, USER_ROLE_DOCTOR]),
  appointmentsController.updateAppointment
);
//delete an appointment route
router.delete(
  "/:id",
  authenticationMiddleware.authenticate,
  authenticationMiddleware.rolePolicy([USER_ROLE_ADMIN, USER_ROLE_DOCTOR]),
  appointmentsController.deleteAppointment
);

// Book an appointment
router.post(
  "/book",
  authenticationMiddleware.authenticate,
  authenticationMiddleware.rolePolicy([USER_ROLE_PATIENT]),
  appointmentsController.bookAppointment
);

module.exports = router;
