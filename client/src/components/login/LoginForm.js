import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import config from "../../config";

//A component that renders a login form.
const LoginForm = ({ handleShowSignup }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorMessage, setErrrorMessage] = useState("");

  //A function that handles the form submission.
  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginData = { username, password };
    try {
      const res = await fetch(
        `${config.REACT_APP_API_ENDPOINT}/api/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        }
      );
      if (!res.ok) {
        setErrrorMessage((await res.json()).err);
        return;
      }
      document.cookie = `token=${(await res.json()).token}`;
      localStorage.setItem("username", username);
      setLoggedIn(true);
      window.location.reload();
    } catch (error) {
      console.log(error);
      setErrrorMessage("Failed to log in");
    }
  };

  //Returns a form to Login as a patient or doctor.
  return (
    <Form onSubmit={handleSubmit}>
      <h3>Login</h3>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <div className="d-flex flex-column justify-content-around align-items-center mb-3">
        <Button variant="success" type="submit">
          Log in
        </Button>
      </div>
      <hr className="mt-3 mb-3" />
      <div className="d-flex justify-content-end align-items-center">
        <p className="m-0">Don't have an account yet?</p>
        <Button className="ml-15" variant="primary" onClick={handleShowSignup}>
          Sign up
        </Button>
      </div>
    </Form>
  );
};

export default LoginForm;
