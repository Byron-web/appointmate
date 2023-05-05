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

/*Remember to do the following in order: 
2) Set up the roles so that if a user has an admin role they can view appointmentlist and if they have a patient role they can view the patientappointmentlist(think of a better name)
3) fix edit and make sure all CRUB methods are working and styling is complete for the frontend.
4) Make sure there is no more evidence of "todo" anywhere in the app including comments.
5) make sure to add one snapshot test for frontend and 1 or two unit tests, then atleast 2 unit tests for the backend.
6) Make sure the entire app is well documented with comments so that users know exactly which each piece of code does.
7) Look into using Helmut for security
8) Get the app ready for deployment
9) expand on readme.md as per task 16 requirements including deployment link in readme.md at the end
10) make sure github is up to date as well.

<PatientList handlePatientSelect={handlePatientSelect} />
*/
