//Various libraries and components.
import React, { useState } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import "./appointmentStyles.css";
import * as jose from "jose";

//State brought in as props from parent component(AppointmentList)
const AppointmentItem = ({
  id,
  patientId,
  doctorId,
  date,
  reason,
  status,
  patients,
  onDelete,
  editAppointmentPatientId,
  setEditAppointmentPatientId,
  editAppointmentReason,
  setEditAppointmentReason,
  editAppointmentStatus,
  setEditAppointmentStatus,
  editAppointmentDate,
  setEditAppointmentDate,
  setAppointments,
  appointments,
}) => {
  const [showModal, setShowModal] = useState(false);
  const token = document.cookie.split("=")[1];
  let username = "";
  let role = "";
  if (token) {
    try {
      const jwtPayload = jose.decodeJwt(token);
      username = jwtPayload.username;
      role = jwtPayload.roles[0];
    } catch (err) {
      console.log(err);
    }
  }

  //The handleDelete function is used to delete an appointment. It sends a DELETE request to the server with the appointment id and the JWT token in the authorization header. If the request is successful, it calls the onDelete function and refreshes the page.
  const handleDelete = async () => {
    try {
      const token = document.cookie.split("=")[1];
      const res = await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/api/appointment/${id}`,
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

  //The handleEditClick function is used to set the showModal state variable to true when the user clicks the "Edit" button thus opening the edit modal.
  const handleEditClick = () => {
    setShowModal(true);
  };

  /* The handleEditSave function is used to update an appointment. It sends a PUT request to the server with the appointment id, the updated fields, and the JWT token in the authorization header. If the request is successful, it calls the setAppointments function with the updated appointments.*/
  const handleEditSave = async (id) => {
    try {
      const token = document.cookie.split("=")[1];
      const res = await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/api/appointment/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify({
            patientId: editAppointmentPatientId,
            reason: editAppointmentReason,
            date: editAppointmentDate,
            status: editAppointmentStatus,
          }),
        }
      );

      if (!res.ok) {
        console.log("Failed to edit an appointment");
        return;
      }

      setAppointments(
        appointments.map((appointment) =>
          appointment._id === id
            ? {
                ...appointment,
                patientId: editAppointmentPatientId,
                reason: editAppointmentReason,
                date: editAppointmentDate,
                status: editAppointmentStatus,
              }
            : appointment
        )
      );
    } catch (err) {
      console.log(err);
    }
    handleCloseModal();
  };

  // The handleCloseModal function is used to close the edit modal and reset the state variables to their initial values.
  const handleCloseModal = () => {
    setShowModal(false);
    setEditAppointmentPatientId("");
    setEditAppointmentReason("#FFFFFF");
    setEditAppointmentDate(new Date());
  };

  return (
    <>
      {/* Appointment Card */}
      <Card className="my-3">
        <Card.Body>
          <Card.Title></Card.Title>
          {/* Display patient/doctor Id depending on the role */}
          {role === "doctor" ? (
            <Card.Text className="d-flex">
              <strong className="mr-10">Patient Id:</strong> {patientId}
            </Card.Text>
          ) : (
            <Card.Text className="d-flex">
              <strong className="mr-10">Doctor Id:</strong> {doctorId}
            </Card.Text>
          )}
          {/* Display reason for appointment */}
          <Card.Text className="d-flex">
            <strong className="mr-10">Reason for appointment:</strong> {reason}
          </Card.Text>
          {/* Display status */}
          <Card.Text className="d-flex">
            <strong className="mr-10">Status:</strong> {status}
          </Card.Text>
          <div className="card-footer--wrapper">
            <div>
              {/* Show Edit and Delete buttons for doctor role */}
              {role === "doctor" ? (
                <>
                  {/* Edit and Delete buttons */}
                  <Button variant="secondary" onClick={handleEditClick}>
                    Edit
                  </Button>{" "}
                  <Button variant="danger" onClick={handleDelete}>
                    Delete
                  </Button>
                </>
              ) : (
                <></>
              )}
              {/* Hide buttons for patient role */}
            </div>
            {/* Display appointment date */}
            <div className="date--wrapper">
              <h4 className="my-0 mx-1">Appointment date</h4>
              <Card.Text>
                {moment(date).format("D MMMM YYYY, h:mm a")}
              </Card.Text>
            </div>
          </div>
        </Card.Body>
      </Card>
      {/* Edit Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              {/* Patient Id selection */}
              <Form.Label>Patient Id {editAppointmentPatientId}</Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={editAppointmentPatientId}
                onChange={(e) =>
                  setEditAppointmentPatientId(e.currentTarget.value)
                }
              >
                {/* Option to select a patient */}
                <option value="default">Please select option</option>
                {/* Display a list of patients to select */}
                {patients.map((patient) => (
                  <option value={`${patient.username}`}>
                    {patient.firstname + " " + patient.lastname}
                  </option>
                ))}
              </Form.Select>
              {/* Reason for appointment input */}
              <Form.Label>Reason for appointment</Form.Label>
              <Form.Control
                type="text"
                value={editAppointmentReason}
                onChange={(e) => setEditAppointmentReason(e.target.value)}
              />
              {/* Status selection */}
              <Form.Label>Status</Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={editAppointmentStatus}
                onChange={(e) =>
                  setEditAppointmentStatus(e.currentTarget.value)
                }
              >
                {/* Option to select a status */}
                <option value="default">Please select option</option>
                <option value="scheduled">Scheduled</option>
                <option value="rescheduled">Rescheduled</option>
                <option value="cancelled">Cancelled</option>
                <option value="completed">Completed</option>
              </Form.Select>
              <Form.Label>Date</Form.Label>
              <br />
              {/* Edit date and time */}
              <DatePicker
                selected={editAppointmentDate}
                onChange={(date) => setEditAppointmentDate(date)}
                dateFormat="dd/MM/yyyy h:mm aa"
                showTimeSelect
                timeFormat="h:mm aa"
                timeIntervals={30}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {/* Edit and Save buttons */}
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleEditSave(id)}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AppointmentItem;
