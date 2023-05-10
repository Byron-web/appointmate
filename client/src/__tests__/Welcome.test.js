import React from "react";
import renderer from "react-test-renderer";
import Welcome from "../components/Welcome";

test("Welcome component renders correctly", () => {
  const component = renderer.create(<Welcome />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
