import React from "react";
import { shallow } from "enzyme";
import EmployeeForm from "../components/EmployeeForm";

describe("EmployeeForm", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<EmployeeForm />);
  });

  it("should render a form", () => {
    expect(wrapper.find("form")).toHaveLength(1);
  });

  it("should render input fields for first name, last name, email, dob, address, and salary", () => {
    expect(wrapper.find('input[name="firstName"]')).toHaveLength(1);
    expect(wrapper.find('input[name="lastName"]')).toHaveLength(1);
    expect(wrapper.find('input[name="email"]')).toHaveLength(1);
    expect(wrapper.find('input[name="dob"]')).toHaveLength(1);
    expect(wrapper.find('input[name="address"]')).toHaveLength(1);
    expect(wrapper.find('input[name="salary"]')).toHaveLength(1);
  });

  it("should call the onSubmit prop when the form is submitted", () => {
    const onSubmit = jest.fn();
    wrapper.setProps({ onSubmit });
    wrapper.find("form").simulate("submit");
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
