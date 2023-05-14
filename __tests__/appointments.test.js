const request = require("supertest");
const app = require("../index");

// Test suite for the POST /api/users/login endpoint.
describe("POST /api/users/login", () => {
  // Test case to verify successful user login and token retrieval.
  it("should log in a user and return a token", async () => {
    const res = await request(app)
      .post("/api/users/login")
      .send({ username: "Kevin", password: "123", roles: ["doctor"] });
    // Expect HTTP response status code to be 200
    expect(res.statusCode).toEqual(200);
    // Expect the response body to contain a token
    expect(res.body.token).toBeDefined();
  });

  // Test case to verify error handling when incorrect username or password is provided.
  it("should return an error if the username or password is incorrect", async () => {
    const res = await request(app)
      .post("/api/users/login")
      .send({
        username: "Doctor",
        password: "wrongpassword",
        roles: ["doctor"],
      });
    // Expect HTTP response status code to be 401
    expect(res.statusCode).toEqual(401);
    // Expect the response body error message to indicate invalid username or password
    expect(res.body.err).toEqual("Username or password not valid");
  });
});
