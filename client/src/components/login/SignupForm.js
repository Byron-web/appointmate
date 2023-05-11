import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import * as _ from "lodash";
import config from "../../config";

/* This code imports React and the useState hook from the "react" library, as well as Form, and Button components from the "react-bootstrap" library.

The code defines a functional component called SignupForm which takes in a prop called handleShowLogin. This component contains a form with three inputs: username, password, and confirmPassword. When the user submits the form by clicking the "Sign up" button, the handleSubmit function is called. It first checks if the entered passwords match. If they do not match, it sets the signupError state to "Passwords do not match" and returns.

If the passwords match, the function sends a POST request to the "/api/users/register" endpoint with the username and password entered by the user. If the response is successful, it sets the signupSuccess state to true and clears the signupError state. If the response is not successful, it sets the signupSuccess state to false and sets the signupError state to the error message returned by the server.

The form also contains two buttons: "Log in" and "Sign up". Clicking the "Log in" button will call the handleShowLogin function passed in as a prop. Clicking the "Sign up" button will submit the form.

The component also conditionally renders a success or error message depending on the state of signupSuccess and signupError. If signupSuccess is true, it displays a green "Sign up successful!" message. If signupError is not an empty string, it displays a red error message with the error message returned by the server. */

const SignupForm = ({ handleShowLogin }) => {
  //User state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [signupError, setSignupError] = useState("");
  //Doctor and patient state
  const [firstname, setFirstName] = useState("");
  const [lastname, setLateName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [degree, setDegree] = useState("");
  const [practiceNumber, setPracticeNumber] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setSignupError("Passwords do not match");
      return;
    }

    if (!role) {
      setSignupError("Choose between doctor or patient");
      return;
    }

    if (role === "doctor") {
      if (
        !firstname ||
        !lastname ||
        !email ||
        !mobileNo ||
        !degree ||
        !practiceNumber
      ) {
        setSignupError("Missing required fields");
        return;
      }
    } else if (!firstname || !lastname || !email || !mobileNo) {
      setSignupError("Missing required fields");
      return;
    }

    try {
      const body = {
        username: username,
        password: password,
        roles: [role],
      };
      if (role === "doctor") {
        body.doctor = {
          firstname: firstname,
          lastname: lastname,
          email: email,
          mobileNo: mobileNo,
          degree: degree,
          practiceNumber: practiceNumber,
        };
      }
      if (role === "patient") {
        body.patient = {
          firstname: firstname,
          lastname: lastname,
          email: email,
          mobileNo: mobileNo,
        };
      }
      const res = await fetch(
        `${config.REACT_APP_API_ENDPOINT}/api/users/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      if (!res.ok) {
        setSignupError((await res.json()).err);
        return;
      }
      setSignupSuccess(true);
      setSignupError("");
    } catch (err) {
      setSignupSuccess(false);
      setSignupError(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3 d-flex flex-column justify-content-center align-items-center">
        {/* Username */}
        <Form.Label>Username</Form.Label>
        <Form.Control
          controlId="formBasicUsername"
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Form.Text className="text-muted">
          We'll never share your username with anyone else.
        </Form.Text>
        {/* Password */}
        <Form.Label>Password</Form.Label>
        <Form.Control
          controlId="formBasicPassword"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* Confirm Password */}
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          controlId="formBasicConfirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {/* Create account as */}
        <Form.Label className="mt-2">Create an account as a</Form.Label>
        <div className="d-flex flex-row mt-1">
          <Form.Check
            type="radio"
            label="Doctor"
            inline
            name="user-type"
            onChange={(e) => setRole("doctor")}
          />
          <Form.Check
            type="radio"
            label="Patient"
            inline
            name="user-type"
            onChange={(e) => setRole("patient")}
          />
        </div>
      </Form.Group>
      {/* User details */}
      {role ? (
        <Form.Group>
          {/* First name */}
          <Form.Label>First name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter first name"
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
          />
          {/* Last name */}
          <Form.Label>Last name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter last name"
            value={lastname}
            onChange={(e) => setLateName(e.target.value)}
          />
          {/* email */}
          <Form.Label>email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* Mobile number */}
          <Form.Label>Mobile number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter mobile number"
            value={mobileNo}
            onChange={(e) => setMobileNo(e.target.value)}
          />
        </Form.Group>
      ) : (
        <></>
      )}
      {/* Degree */}
      {role === "doctor" && (
        <>
          <Form.Label>Degree</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter degree"
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
          />
        </>
      )}
      {/* Practice number */}
      {role === "doctor" && (
        <>
          <Form.Label>Practice number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter practice number"
            value={practiceNumber}
            onChange={(e) => setPracticeNumber(e.target.value)}
          />
        </>
      )}
      <hr className="mt-5 mb-3" />
      <div className="d-flex justify-content-around align-items-center mb-3">
        <Button variant="primary" onClick={handleShowLogin}>
          Log in
        </Button>
        <p className="m-0">Or</p>
        <Button variant="success" type="submit">
          Sign up
        </Button>
      </div>
      {signupSuccess && (
        <div className="text-success mt-3">Sign up successful!</div>
      )}
      {signupError && <div className="text-danger mt-3">{signupError}</div>}
    </Form>
  );
};

export default SignupForm;
