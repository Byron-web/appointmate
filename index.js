const express = require("express"); // Import the Express framework
const bodyParser = require("body-parser"); // Middleware to parse JSON bodies in requests
const userRoutes = require("./routes/user.routes"); // Import the user routes
const doctorRoutes = require("./routes/doctor.routes"); // Import the doctor routes
const patientRoutes = require("./routes/patient.routes"); // Import the patient routes
const appointmentRoutes = require("./routes/appointment.routes"); // Import the appointment
const path = require("path"); // Provides utilities for working with file and directory paths
const mongoose = require("mongoose"); // MongoDB object modeling tool
const cors = require("cors"); // Middleware for enabling Cross-Origin Resource Sharing (CORS)
require("dotenv").config(); // Loads environment variables from a .env file
const config = require("./config/config.json"); // Import the configuration file
const swaggerJsdoc = require("swagger-jsdoc"); // Library for generating Swagger/OpenAPI documentation
const swaggerUi = require("swagger-ui-express"); // Middleware for serving Swagger UI

// Create an instance of the Express application
const app = express();
// Middleware to enable cross-origin resource sharing
app.use(cors());
// Middleware to parse JSON bodies in requests
app.use(bodyParser.json());
// Get the port from the environment variables, or use the port specified in the config file
const port = process.env.PORT || config.port;

//Serve static files if app is in production mode.
if (process.env.NODE_ENV === "production") {
  // Priority serve any static files from the "client/build" directory
  app.use(express.static("client/build"));

  // All remaining requests return the React app, so it can handle routing.
  app.get("*", function (request, response) {
    response.sendFile(path.resolve(__dirname, "./client/build"));
  });
}

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

module.exports = app;
