global.TextEncoder = require("util").TextEncoder;

import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import Navbar from "../components/Navbar";

describe("Navbar Component", () => {
  it("matches the snapshot", () => {
    const tree = renderer.create(<Navbar />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
