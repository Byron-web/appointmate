//Import necessary modules and components
import React, { useState } from "react";
import logo from "../images/logo.png";
import "./styles.css";
import { Button } from "react-bootstrap";
import * as jose from "jose";

//accepts three props: loggedIn, setLoggedIn, and setLoginClicked.
function Navbar({ loggedIn, setLoggedIn, setLoginClicked }) {
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
  //Get the JWT token from the cookie and decode it using the jose module. If the token is valid, extract the username and role from the decoded JWT payload. If an error occurs during the decoding process, log it to the console.
  const handleLogout = () => {
    document.cookie = "token=;";
    setLoggedIn(false);
  };

  const handleLoginClick = () => {
    setLoginClicked(true);
  };

  //Define two event handler functions: handleLogout and handleLoginClick. handleLogout deletes the token cookie and sets the loggedIn state to false. handleLoginClick sets the loginClicked state to true.
  return (
    <div className="nav-wrapper">
      <img className="nav-img mx-3" src={logo} alt="logo"></img>
      <div className="nav-welcome-menu">
        {loggedIn ? (
          <p className="m-0">
            Welcome, {username} ({role})
          </p>
        ) : (
          <p className="m-0">Please log in</p>
        )}
        {loggedIn ? (
          <Button
            className="mt-10 mx-3"
            variant="secondary"
            onClick={handleLogout}
          >
            Log out
          </Button>
        ) : (
          <Button
            className="mt-10"
            variant="secondary"
            onClick={handleLoginClick}
          >
            Log in
          </Button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
