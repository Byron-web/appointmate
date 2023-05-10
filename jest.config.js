const path = require("path");

module.exports = {
  roots: [path.join(__dirname, "__tests__")],
  testMatch: [
    "**/__tests__/**/*.+(js|jsx|ts|tsx)",
    "**/?(*.)+(spec|test).+(js|jsx|ts|tsx)",
  ],
  testEnvironment: "node",
};
