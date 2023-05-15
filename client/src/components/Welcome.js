import React from "react";
import { Button, Container } from "react-bootstrap";
import "./styles.css";
import FeatureCard from "./FeatureCard";

//Welcome view that shows in the beginner of the app when a user hasnt logged in, or if a user logs out.
function Welcome() {
  return (
    <div className="welcome--wrapper">
      <div className="welcome--header">
        <h1>
          Welcome to AppointMate: Your Personal Appointment Management App
        </h1>
        <p>
          AppointMate is a user-friendly web application designed to simplify
          and streamline your appointment management process. Whether you're a
          healthcare professional, a personal service provider, or a small
          business owner, AppointMate is here to help you efficiently manage
          your appointments and provide an exceptional experience to your
          clients.
        </p>
        <div className="welcome-features">
          <h2>Key Features</h2>
          <div className="d-flex justify-content-around">
            <FeatureCard
              title="Effortlessly schedule and manage appointments"
              description="With AppointMate, you can easily schedule and manage your appointments in a streamlined and efficient way."
            />
            <FeatureCard
              title="Reduce administrative tasks and paperwork"
              description="Say goodbye to manual paperwork and administrative tasks. AppointMate automates various processes to save you time and effort."
            />
            <FeatureCard
              title="Keep track of important appointment details"
              description="AppointMate allows you to store and access essential appointment information, such as patient names, reason for appointments, and appointment dates, all in one place."
            />
          </div>
        </div>
        <p>
          With AppointMate, you can focus on delivering the best care and
          services to your patients or clients without the hassle of traditional
          appointment management methods. Get started today and experience the
          convenience and efficiency of AppointMate.
        </p>
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
