const express = require("express");
const router = express.Router();
const usersController = require("../controller/user.controller");
const middleWareAuth = require("../middleware/authentication.middleware");

//Routes for logging in and signing up
router.post("/register", usersController.register);
router.post("/login", usersController.login);
router.get("/auth", middleWareAuth.authenticate, usersController.auth);

module.exports = router;
