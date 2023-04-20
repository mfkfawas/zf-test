import React, { useState } from "react";
import axios from "axios";

const AddEmployeeForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [salary, setSalary] = useState("");

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await axios.post("/api/employees", {
        firstName,
        lastName,
        email,
        dob,
        address,
        salary
      });
      setFirstName("");
      setLastName("");
      setEmail("");
      setDob("");
      setAddress("");
      setSalary("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstName">First name:</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={event => setFirstName(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="lastName">Last name:</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={event => setLastName(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="dob">Date of birth:</label>
        <input
          type="date"
          id="dob"
          value={dob}
          onChange={event => setDob(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="address">Address:</label>
        <textarea
          id="address"
          value={address}
          onChange={event => setAddress(event.target.value)}
        ></textarea>
      </div>
      <div>
        <label htmlFor="salary">Salary:</label>
        <input
          type="number"
          id="salary"
          value={salary}
          onChange={event => setSalary(event.target.value)}
        />
      </div>
      <button type="submit">Add Employee</button>
    </form>
  );
};

export default AddEmployeeForm;
