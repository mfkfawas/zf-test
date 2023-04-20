import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { updateEmployee } from "../redux/employeesSlice";

const EditEmployeeForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const employee = location.state;

  const [firstName, setFirstName] = useState(employee.firstName);
  const [lastName, setLastName] = useState(employee.lastName);
  const [email, setEmail] = useState(employee.email);
  const [dob, setDob] = useState(employee.dob);
  const [address, setAddress] = useState(employee.address);
  const [salary, setSalary] = useState(employee.salary);

  const handleSubmit = e => {
    e.preventDefault();

    const updatedEmployee = {
      id: employee.id,
      firstName,
      lastName,
      email,
      dob,
      address,
      salary
    };

    dispatch(updateEmployee(updatedEmployee));
    navigate("/");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
            type="text"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          DOB:
          <input
            type="date"
            value={dob}
            onChange={e => setDob(e.target.value)}
          />
        </label>
        <br />
        <label>
          Address:
          <textarea
            value={address}
            onChange={e => setAddress(e.target.value)}
          />
        </label>
        <br />
        <label>
          Salary:
          <input
            type="number"
            value={salary}
            onChange={e => setSalary(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditEmployeeForm;
