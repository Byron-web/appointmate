import React, { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import "./styles.css";

function PatientList() {
  const [patients, setPatients] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const token = document.cookie.split("=")[1];
    const fetchPatients = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/appointment", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        });
        if (!res.ok) {
          setErrorMessage((await res.json()).err);
          return;
        }
        const data = await res.json();
        setPatients(data);
        setErrorMessage("");
      } catch (err) {
        console.log(err);
        setErrorMessage("This is an error");
      }
    };
    fetchPatients();
  }, []);

  const handlePatientClick = async (patientId) => {
    try {
      const token = document.cookie.split("=")[1];
      const res = await fetch(
        `http://localhost:5000/api/appointment/?id=${patientId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );
      if (!res.ok) {
        setErrorMessage((await res.json()).err);
        return;
      }
      const data = await res.json();
      props.handlePatientSelect(patientId); // call handlePatientSelect with the selected patient's ID
      console.log(data); // display appointments for the selected patient
      setErrorMessage("");
    } catch (err) {
      console.log(err);
      setErrorMessage("This is an error");
    }
  };

  return (
    <>
      <ListGroup>
        <div className="patient-list--wrapper">
          <h1>Patient List</h1>
          {patients.map((patient) => (
            <ListGroup.Item
              key={patient._id}
              action
              onClick={() => handlePatientClick(patient._id)}
            >
              {patient.name}
            </ListGroup.Item>
          ))}
        </div>
      </ListGroup>
    </>
  );
}

export default PatientList;
