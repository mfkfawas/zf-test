const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const employees = [];

app.use(bodyParser.json());
app.use(cors());

app.get("/employees", (req, res) => {
  res.json(employees);
});

app.post("/employees", (req, res) => {
  const employee = req.body;
  employee.id = Date.now();
  employees.push(employee);
  res.status(201).json(employee);
});

app.put("/employees/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updatedEmployee = req.body;
  const index = employees.findIndex(employee => employee.id === id);
  if (index !== -1) {
    employees[index] = { id, ...updatedEmployee };
    res.json(employees[index]);
  } else {
    res.status(404).json({ message: `Employee with id ${id} not found` });
  }
});

app.delete("/employees/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = employees.findIndex(employee => employee.id === id);
  if (index !== -1) {
    employees.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(404).json({ message: `Employee with id ${id} not found` });
  }
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
