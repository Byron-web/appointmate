const express = require("express");
const router = express.Router();
const patientController = require("../controller/patient.controller");
const authenticationMiddleware = require("../middleware/authentication.middleware");
const {
  USER_ROLE_ADMIN,
  USER_ROLE_DOCTOR,
  USER_ROLE_PATIENT,
} = require("../constants/roles.constants");

//All the patient routes used in the app, various roles have access to various routes, there is also middleware that through the process checks various conditions before allowing access to the data of that route.

//Gets all the data
router.get(
  "/",
  authenticationMiddleware.authenticate,
  authenticationMiddleware.rolePolicy([
    USER_ROLE_ADMIN,
    USER_ROLE_DOCTOR,
    USER_ROLE_PATIENT,
  ]),
  patientController.getAllPatients
);
//Creates all the data
router.post(
  "/",
  authenticationMiddleware.authenticate,
  authenticationMiddleware.rolePolicy([USER_ROLE_ADMIN, USER_ROLE_DOCTOR]),
  patientController.createPatient
);
//Updates data by the given id
router.put(
  "/:id",
  authenticationMiddleware.authenticate,
  authenticationMiddleware.rolePolicy([
    USER_ROLE_ADMIN,
    USER_ROLE_DOCTOR,
    USER_ROLE_PATIENT,
  ]),
  patientController.updatePatient
);
//Deletes data by the given id
router.delete(
  "/:id",
  authenticationMiddleware.authenticate,
  authenticationMiddleware.rolePolicy([USER_ROLE_ADMIN, USER_ROLE_DOCTOR]),
  patientController.deletePatient
);

module.exports = router;
