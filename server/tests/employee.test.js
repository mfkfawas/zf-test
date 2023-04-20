const request = require("supertest");
const app = require("../app");

describe("Employee API", () => {
  let employeeId;

  it("should create a new employee", async () => {
    const res = await request(app).post("/employees").send({
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@example.com",
      dob: "1990-01-01",
      address: "123 Main St",
      salary: "50000"
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");
    employeeId = res.body.id;
  });

  it("should get a list of employees", async () => {
    const res = await request(app).get("/employees");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it("should get a specific employee", async () => {
    const res = await request(app).get(`/employees/${employeeId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.id).toEqual(employeeId);
  });

  it("should update an employee", async () => {
    const res = await request(app).put(`/employees/${employeeId}`).send({
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@example.com",
      dob: "1990-01-01",
      address: "123 Main St",
      salary: "60000"
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.salary).toEqual("60000");
  });

  it("should delete an employee", async () => {
    const res = await request(app).delete(`/employees/${employeeId}`);
    expect(res.statusCode).toEqual(204);
  });
});
