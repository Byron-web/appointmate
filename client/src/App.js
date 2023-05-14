import React, { useState, useEffect } from "react";
import Login from "./components/login/Login";
import "./App.css";
import AppointmentList from "./components/appointment/AppointmentList";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import PatientList from "./components/PatientList";
import Welcome from "./components/Welcome";

//App checks if the user has a valid JWT token, if so the todo view will render, else the login/register screen will render
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [loginClicked, setLoginClicked] = useState(false);

  const handlePatientSelect = (patientId) => {
    setSelectedPatientId(patientId);
  };

  useEffect(() => {
    const token = document.cookie.split("=")[1];
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <>
      <Navbar
        setLoginClicked={setLoginClicked}
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
      />
      <div className="App">
        {loggedIn ? (
          <div className="loggedin--wrapper">
            <AppointmentList />
          </div>
        ) : loginClicked ? (
          <Login />
        ) : (
          <Welcome />
        )}
      </div>
    </>
  );
}

export default App;
