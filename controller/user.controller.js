const config = require("../config/config.json");
const db = require("../database/db");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const {
  USER_ROLE_ADMIN,
  USER_ROLE_DOCTOR,
  USER_ROLE_PATIENT,
} = require("../constants/roles.constants");

//Register a new doctor or patient account
exports.register = async (req, res) => {
  const user = req.body;
  const username = user.username;
  const password = user.password;
  const role = user.roles[0];
  let userDetails = {};
  if (role === USER_ROLE_DOCTOR) {
    userDetails = user.doctor;
  }
  if (role === USER_ROLE_PATIENT) {
    userDetails = user.patient;
  }

  //Validate username and password
  if (!username || !password) {
    return res.status(400).send({ err: "Username and password is required" });
  }
  const users = await db.users.getAllUsers_async();
  const existingUser = users.find((x) => x.username === username);
  if (existingUser) {
    return res.status(400).send({ err: "Username already exists" });
  }

  //Create User
  try {
    await db.users.createUser_async(user);
    if (role === USER_ROLE_DOCTOR) {
      await db.doctors.createDoctor_async({
        username: username,
        firstname: userDetails.firstname,
        lastname: userDetails.lastname,
        email: userDetails.email,
        mobileNo: userDetails.mobileNo,
        degree: userDetails.degree,
        practiceNumber: userDetails.practiceNumber,
      });
    }
    if (role === USER_ROLE_PATIENT) {
      await db.patients.createPatient_async({
        username: username,
        firstname: userDetails.firstname,
        lastname: userDetails.lastname,
        email: userDetails.email,
        mobileNo: userDetails.mobileNo,
      });
    }
  } catch (err) {
    console.log(err);
    return;
  }

  //Generate and sign token
  const token = jwt.sign(
    { username: user.username, roles: user.roles },
    process.env.SECRET || config.secret,
    {
      algorithm: "HS256",
      expiresIn: "1h",
    }
  );
  return res.send({ token: token });
};

exports.login = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  //Validate username and password
  if (!username || !password) {
    return res.status(400).send({ err: "Username and password is required" });
  }
  const users = await db.users.getAllUsers_async();
  const user = users.find(
    (user) => user.username === username && user.password === password
  );
  if (!user) {
    return res.status(401).send({ err: "Username or password not valid" });
  }

  //Generate and sign token
  const token = jwt.sign(
    { username: user.username, roles: user.roles },
    process.env.SECRET || config.secret,
    {
      algorithm: "HS256",
      expiresIn: "1h",
    }
  );
  return res.send({ token: token });
};

exports.auth = async (req, res) => {
  return res.send();
};
