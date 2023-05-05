//Swagger incorporated for the purpose of testing endpoints

/**
 * @swagger
 * tags:
 *   name: Doctors
 *   description: An API to manage doctors
 * /doctor:
 *   get:
 *     summary: Get all doctors
 *     tags: [Doctors]
 *     responses:
 *       200:
 *         description: Retrieved all doctors
 *       500:
 *         description: Some server error
 *
 */

const express = require("express");
const router = express.Router();
const doctorController = require("../controller/doctor.controller");
const authenticationMiddleware = require("../middleware/authentication.middleware");
const {
  USER_ROLE_ADMIN,
  USER_ROLE_DOCTOR,
  USER_ROLE_PATIENT,
} = require("../constants/roles.constants");

//All the doctor routes used in the app, various roles have access to various routes, there is also middleware that through the process checks various conditions before allowing access to the data of that route.

//Gets all the data
router.get(
  "/",
  authenticationMiddleware.authenticate,
  authenticationMiddleware.rolePolicy([
    USER_ROLE_ADMIN,
    USER_ROLE_DOCTOR,
    USER_ROLE_PATIENT,
  ]),
  doctorController.getAllDoctors
);
//Creates all the data
router.post(
  "/",
  authenticationMiddleware.authenticate,
  authenticationMiddleware.rolePolicy([USER_ROLE_ADMIN, USER_ROLE_DOCTOR]),
  doctorController.createDoctor
);
//Updates data by the given id
router.put(
  "/:id",
  authenticationMiddleware.authenticate,
  authenticationMiddleware.rolePolicy([USER_ROLE_ADMIN, USER_ROLE_DOCTOR]),
  doctorController.updateDoctor
);
//Deletes data by the given id
router.delete(
  "/:id",
  authenticationMiddleware.authenticate,
  authenticationMiddleware.rolePolicy([USER_ROLE_ADMIN, USER_ROLE_DOCTOR]),
  doctorController.deleteDoctor
);

module.exports = router;
