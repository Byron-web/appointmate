import React from "react";
import { render } from "@testing-library/react";
import LoginForm from "../components/login/LoginForm";

//Test to ensure that the login form renders without errors.
test("renders login form without errors", () => {
  render(<LoginForm />);
});
