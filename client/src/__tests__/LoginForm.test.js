import React from "react";
import { render } from "@testing-library/react";
import LoginForm from "../components/login/LoginForm";

test("renders login form without errors", () => {
  render(<LoginForm />);
});
