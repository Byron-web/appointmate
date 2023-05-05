import React from "react";
import { Button, Container } from "react-bootstrap";
import "./styles.css";
import banner from "../images/Welcome.jpg";

//Welcome view that shows in the beginner of the app when a user hasnt logged in, or if a user logs out.
function Welcome() {
  return (
    <div className="welcome--wrapper">
      <div className="welcome--header">
        <h1>Welcome</h1>
      </div>
      <div className="banner-info--wrapper">
        <Container className="banner-info--container">
          <h4>
            Login by clicking the login button on the top left of this page
          </h4>
          <div className="banner-info--divider"></div>
          <div className="banner-info-footer">
            <span className="mx-3">Or</span>
            <Button variant="primary">
              <a
                href="https://github.com/Byron-web/appointmate"
                target="_blank"
              >
                View Code
              </a>
            </Button>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Welcome;
