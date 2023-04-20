import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchEmployees, deleteEmployee } from "../redux/employeeSlice";

const EmployeeList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const employees = useSelector(state => state.employee.employees);
  const [sortedEmployees, setSortedEmployees] = useState([]);
  const [salaryFilter, setSalaryFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  useEffect(() => {
    setSortedEmployees(
      [...employees].sort((a, b) => {
        if (a.firstName.toLowerCase() < b.firstName.toLowerCase()) return -1;
        if (a.firstName.toLowerCase() > b.firstName.toLowerCase()) return 1;
        if (a.lastName.toLowerCase() < b.lastName.toLowerCase()) return -1;
        if (a.lastName.toLowerCase() > b.lastName.toLowerCase()) return 1;
        return 0;
      })
    );
  }, [employees]);

  const handleDelete = id => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      dispatch(deleteEmployee(id));
    }
  };

  const handleFilterChange = event => {
    setSalaryFilter(event.target.value);
  };

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const filteredEmployees =
    salaryFilter === "All"
      ? sortedEmployees
      : sortedEmployees.filter(
          employee => employee.salary >= parseInt(salaryFilter)
        );

  const searchedEmployees = searchTerm
    ? filteredEmployees.filter(
        employee =>
          employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          employee.lastName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredEmployees;

  return (
    <div>
      <h2>Employee List</h2>
      <div>
        <label>
          Filter by salary:
          <select value={salaryFilter} onChange={handleFilterChange}>
            <option value="All">All</option>
            <option value="1000">1000+</option>
            <option value="2000">2000+</option>
            <option value="3000">3000+</option>
          </select>
        </label>
        <label>
          Search by name:
          <input type="text" value={searchTerm} onChange={handleSearch} />
        </label>
      </div>
      {searchedEmployees.length ? (
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Date of Birth</th>
              <th>Address</th>
              <th>Salary</th>
              <th>Edit Employee</th>
            </tr>
          </thead>
          <tbody>
            {searchedEmployees.map(employee => (
              <tr key={employee.id}>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.email}</td>
                <td>{employee.dob}</td>
                <td>{employee.address}</td>
                <td>{employee.salary}</td>
                <td>
                  <button
                    onClick={e => {
                      e.preventDefault();
                      navigate(`/edit-employee/${employee.id}`, {
                        state: employee
                      });
                    }}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button onClick={() => handleDelete(employee.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No employees found.</p>
      )}
    </div>
  );
};

export default EmployeeList;
