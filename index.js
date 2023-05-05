const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user.routes");
const doctorRoutes = require("./routes/doctor.routes");
const patientRoutes = require("./routes/patient.routes");
const appointmentRoutes = require("./routes/appointment.routes");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const config = require("./config/config.json");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// App configuration
const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = process.env.PORT || config.port;

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, "./client/build")));

// All remaining requests return the React app, so it can handle routing.
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build"));
});

//The Routes
app.use("/api/users", userRoutes);
app.use("/api/appointment", appointmentRoutes);
app.use("/api/doctor", doctorRoutes);
app.use("/api/patient", patientRoutes);

// Swagger for testing purposes
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "AppointMate API Documentation",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Byron Labuschagne",
        url: "https://byron-labuschagne.com",
        email: "byron.labuschagne@email.com",
      },
    },
    components: {
      securitySchemes: {
        Authorization: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          value: "Bearer <JWT token here>",
        },
      },
    },
    servers: [
      {
        url: "http://localhost:5000/api",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(specs));

// MongoDB configuration
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING || config.mongoConnectionString)
  .then(() => {
    console.log("Connected to database");

    // Start the server and listen on port 5000
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
