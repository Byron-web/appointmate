//Various libraries and components.
import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import AppointmentItem from "./AppointmentItem";
import "./appointmentStyles.css";
import * as jose from "jose";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatInTimeZone } from "date-fns-tz";
import config from "../../config";

// Define a functional component called AppointmentList
const AppointmentList = () => {
  // Define multiple state variables using the useState hook
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [newAppointmentPatientId, setNewAppointmentPatientId] =
    useState("default");
  const [newAppointmentReason, setNewAppointmentReason] = useState("");
  const [newAppointmentStatus, setNewAppointmentStatus] = useState("default");
  const [newAppointmentDate, setNewAppointmentDate] = useState(new Date());
  const [editAppointmentPatientId, setEditAppointmentPatientId] =
    useState("default");
  const [editAppointmentReason, setEditAppointmentReason] = useState("");
  const [editAppointmentStatus, setEditAppointmentStatus] = useState("default");
  const [editAppointmentDate, setEditAppointmentDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);

  // Get the token from the cookie and decode it to retrieve the user id and role
  const token = document.cookie.split("=")[1];
  let id = "";
  let role = "";
  const jwtPayload = jose.decodeJwt(token);
  id = jwtPayload.username;
  role = jwtPayload.roles[0];

  /* This code is a React component that displays a apppointment list with various functionalities, including creating new appointments, editing existing appointments, and deleting appointments. It fetches the data from an API using fetch() and sets the state using useState() and useEffect() hooks.*/

  useEffect(() => {
    // Define an async function that fetches appointments for the logged in user
    const fetchAppointments = async () => {
      try {
        // Send a GET request to the server to fetch appointments for the logged in user
        const res = await fetch(
          `${config.REACT_APP_API_ENDPOINT}/api/appointment/${role}/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          }
        );
        // If the server returns an error, set the error message state to the error message returned by the server and return
        if (!res.ok) {
          setErrorMessage((await res.json()).err);
          return;
        }
        // If the server returns successfully, set the appointments state to the data returned by the server and clear the error message state
        const data = await res.json();
        setAppointments(data);
        setErrorMessage("");
      } catch (err) {
        console.log(err);
        setErrorMessage("This is an error");
      }
    };
    // Call the fetchAppointments function
    fetchAppointments();
  }, []);

  useEffect(() => {
    // Define an async function that fetches all patients
    const fetchPatients = async () => {
      try {
        // Send a GET request to the server to fetch all patients
        const res = await fetch(
          `${config.REACT_APP_API_ENDPOINT}/api/patient`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          }
        );
        // If the server returns an error, set the error message state to the error message returned by the server and return
        if (!res.ok) {
          setErrorMessage((await res.json()).err);
          return;
        }
        // If the server returns successfully, set the patients state to the data returned by the server and clear the error message state
        const data = await res.json();
        setPatients(data);
        setErrorMessage("");
      } catch (err) {
        console.log(err);
        setErrorMessage("This is an error");
      }
    };
    // Call the fetchPatients function
    fetchPatients();
  }, []);

  // This function is called when the "Create Appointment" button is clicked and opens the create modal.
  const handleCreateClick = () => {
    setShowModal(true);
  };

  // This function is called when the modal is closed and closes the create modal, it also sets patientId and Reason to an empty string, as well as sets date to the current date.
  const handleCloseModal = () => {
    setShowModal(false);
    setNewAppointmentPatientId("");
    setNewAppointmentReason("");
    setNewAppointmentDate(new Date());
  };

  // This function is called when the "Save" button is clicked in the modal and if any field hasnt been filed it instructs the user to fill those fields, it also sends a POST request to the backed to send the data to the api then to the DB.
  const handleCreateAppointment = async () => {
    if (
      !newAppointmentStatus ||
      !newAppointmentPatientId ||
      newAppointmentStatus === "default" ||
      newAppointmentPatientId === "default"
    ) {
      setErrorMessage("You need to choose a status and patient");
      return;
    }

    try {
      // Convert the date to the desired timezone
      const date = new Date(newAppointmentDate);
      const dateInDesiredTimeZone = formatInTimeZone(
        date,
        "Africa/Johannesburg",
        "yyyy-MM-dd HH:mm:ss.SSS"
      );
      console.log(date);
      const res = await fetch(
        `${config.REACT_APP_API_ENDPOINT}/api/appointment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify({
            doctorId: id,
            patientId: newAppointmentPatientId,
            reason: newAppointmentReason,
            date: dateInDesiredTimeZone,
            status: newAppointmentStatus,
          }),
        }
      );
      if (!res.ok) {
        console.log("Failed to create an appointment");
        return;
      }
      const data = await res.json();
      setAppointments([...appointments, data]);
      handleCloseModal();
    } catch (err) {
      console.log(err);
    }
  };

  // Function to handle appointment deletion
  const handleDelete = async () => {
    try {
      const res = await fetch(
        `${config.REACT_APP_API_ENDPOINT}/api/appointment/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );
      if (!res.ok) {
        console.log(await res.json());
        return;
      }
      onDelete(id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  //Renders an appointment based on the users role, if patient, the user will only view the appointment, if doctor the user will have access to creating, editing, and deleting an appointment.
  return (
    <div className="doctor-list--container">
      <p className="text-white">{errorMessage}</p>
      <div className="doctor-list--wrapper">
        <h1>Appointments</h1>
        {role === "doctor" ? (
          <>
            <Button
              className="mt-10"
              variant="secondary"
              onClick={handleCreateClick}
            >
              Create appointment
            </Button>
          </>
        ) : (
          <></>
        )}
      </div>
      <div>
        {appointments.map((appointment) => (
          <AppointmentItem
            id={appointment._id}
            patientId={appointment.patientId}
            doctorId={appointment.doctorId}
            date={appointment.date}
            reason={appointment.reason}
            status={appointment.status}
            onDelete={handleDelete}
            patients={patients}
            setPatients={setPatients}
            editAppointmentPatientId={editAppointmentPatientId}
            setEditAppointmentPatientId={setEditAppointmentPatientId}
            editAppointmentReason={editAppointmentReason}
            setEditAppointmentReason={setEditAppointmentReason}
            editAppointmentStatus={editAppointmentStatus}
            setEditAppointmentStatus={setEditAppointmentStatus}
            editAppointmentDate={editAppointmentDate}
            setEditAppointmentDate={setEditAppointmentDate}
            appointments={appointments}
            setAppointments={setAppointments}
          />
        ))}
      </div>
      {/* Create Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        {/* Display error message if present */}
        <p>{errorMessage}</p>
        <Modal.Header closeButton>
          {/* Modal title */}
          <Modal.Title>Create Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              {/* Patient ID */}
              <Form.Label>Patient Id {newAppointmentPatientId}</Form.Label>
              {/* Dropdown list for selecting patient */}
              <Form.Select
                aria-label="Default select example"
                value={newAppointmentPatientId}
                onChange={(e) =>
                  setNewAppointmentPatientId(e.currentTarget.value)
                }
              >
                <option value="default">Please select option</option>
                {/* List of patients */}
                {patients.map((patient) => (
                  <option value={`${patient.username}`}>
                    {patient.firstname + " " + patient.lastname}
                  </option>
                ))}
              </Form.Select>
              {/* Reason for appointment */}
              <Form.Label>Reason for appointment</Form.Label>
              {/* Input field for entering reason */}
              <Form.Control
                type="text"
                value={newAppointmentReason}
                onChange={(e) => setNewAppointmentReason(e.target.value)}
              />
              {/* Status */}
              <Form.Label>Status</Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={newAppointmentStatus}
                onChange={(e) => setNewAppointmentStatus(e.currentTarget.value)}
              >
                <option value="default">Please select option</option>
                <option value="scheduled">Scheduled</option>
                <option value="rescheduled">Rescheduled</option>
                <option value="cancelled">Cancelled</option>
                <option value="completed">Completed</option>
              </Form.Select>
              {/* Date */}
              <Form.Label>Date</Form.Label>
              <br />
              {/* Date picker for selecting date and time */}
              <DatePicker
                selected={newAppointmentDate}
                onChange={(date) => setNewAppointmentDate(date)}
                dateFormat="dd/MM/yyyy h:mm aa"
                showTimeSelect
                timeFormat="h:mm aa"
                timeIntervals={30}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {/* Close button */}
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          {/* Save button */}
          <Button variant="primary" onClick={handleCreateAppointment}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AppointmentList;
