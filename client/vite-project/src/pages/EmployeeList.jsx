import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchEmployees } from "../reducers/employees";

const EmployeeList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const employees = useSelector(state => state.employees.list);
  const loading = useSelector(state => state.employees.loading);
  const error = useSelector(state => state.employees.error);

  const addEmployeeHandler = e => {
    e.preventDefault();
    navigate("/add-employee");
  };

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  if (loading) {
    return <p>Loading employees...</p>;
  }

  if (error) {
    return <p>Error loading employees: {error.message}</p>;
  }

  return (
    <>
      <ul>
        {employees.map(employee => (
          <li key={employee.id}>
            {employee.firstName} {employee.lastName} - {employee.salary}
          </li>
        ))}
      </ul>
      <button onClick={addEmployeeHandler}>Add New Employee</button>
    </>
  );
};

export default EmployeeList;
