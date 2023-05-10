const request = require("supertest");
const app = require("../index");

describe("POST /api/users/login", () => {
  it("should log in a user and return a token", async () => {
    const res = await request(app)
      .post("/api/users/login")
      .send({ username: "Doctor", password: "123", roles: ["doctor"] });
    expect(res.statusCode).toEqual(200);
    expect(res.body.token).toBeDefined();
  });

  it("should return an error if the username or password is incorrect", async () => {
    const res = await request(app)
      .post("/api/users/login")
      .send({
        username: "Doctor",
        password: "wrongpassword",
        roles: ["doctor"],
      });
    expect(res.statusCode).toEqual(401);
    expect(res.body.err).toEqual("Username or password not valid");
  });
});
