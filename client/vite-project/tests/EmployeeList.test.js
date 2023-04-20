import React from "react";
import { shallow } from "enzyme";
import EmployeeList from "../components/EmployeeList";

describe("EmployeeList", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<EmployeeList />);
  });

  it("should render a table", () => {
    expect(wrapper.find("table")).toHaveLength(1);
  });

  it("should render table headers for first name, last name, email, dob, address, and salary", () => {
    expect(wrapper.find('th[data-testid="firstNameHeader"]')).toHaveLength(1);
    expect(wrapper.find('th[data-testid="lastNameHeader"]')).toHaveLength(1);
    expect(wrapper.find('th[data-testid="emailHeader"]')).toHaveLength(1);
    expect(wrapper.find('th[data-testid="dobHeader"]')).toHaveLength(1);
    expect(wrapper.find('th[data-testid="addressHeader"]')).toHaveLength(1);
    expect(wrapper.find('th[data-testid="salaryHeader"]')).toHaveLength(1);
  });

  it("should render table rows with employee data", () => {
    const employees = [
      {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        dob: "1990-01-01",
        address: "123 Main St",
        salary: 50000
      },
      {
        firstName: "Jane",
        lastName: "Doe",
        email: "jane.doe@example.com",
        dob: "1995-01-01",
        address: "456 Oak St",
        salary: 60000
      }
    ];
    wrapper.setProps({ employees });
    expect(wrapper.find("tbody tr")).toHaveLength(2);
    expect(wrapper.find("tbody tr").at(0).find("td").at(0).text()).toEqual(
      "John"
    );
    expect(wrapper.find("tbody tr").at(0).find("td").at(1).text()).toEqual(
      "Doe"
    );
    expect(wrapper.find("tbody tr").at(0).find("td").at(2).text()).toEqual(
      "john.doe@example.com"
    );
    expect(wrapper.find("tbody tr").at(0).find("td").at(3).text()).toEqual(
      "1990-01-01"
    );
    expect(wrapper.find("tbody tr").at(0).find("td").at(4).text()).toEqual(
      "123 Main St"
    );
    expect(wrapper.find("tbody tr").at(0).find("td").at(5).text()).toEqual(
      "$50,000"
    );
  });
});
