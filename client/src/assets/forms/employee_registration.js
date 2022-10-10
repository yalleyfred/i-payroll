import { useState } from "react";
import "../css/common_styles.css";
import "../css/add_employee_form.css";

import { notification } from "../js/script";
import { ToastContainer } from "react-toastify";

const axios = require("axios").default;

export function EmployeeReg() {
  const initialValues = {
    name: "",
    email: "",
    hire_date: "",
    job_title: "",
    department: "",
    status: "",
    snnit: "",
    tin: "",
  };

  const [employeeRegCredentials, setEmployeeRegCredentials] =
    useState(initialValues);

  const handleFormChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setEmployeeRegCredentials({ ...employeeRegCredentials, [name]: value });
  };

  const submitHandler = (e) => {
    // console.log("works!");
    validate(employeeRegCredentials);
    submit();
  };

  const successAlert = new notification();
  const errorAlert = new notification();

  const submit = () => {
    axios
      .post("http://localhost:3001/api/v1/employees", employeeRegCredentials)
      .then((response) => {
        if (response.status === 201) {
          console.log(response.statusText);
          successAlert.notifySuccess(response.statusText);
          // navigate("/account");
        }
      })
      .catch((error) => {
        errorAlert.notifyError(error.response.data);
        // console.log(error.response.data);
      });
  };

  const validate = (values) => {
    if (
      (values.name,
      values.email,
      values.hire_date,
      values.job_title,
      values.department,
      values.status,
      values.snnit,
      values.tin)
    ) {
      if (values.snnit.length !== 13) {
        return console.log("snnit no. must be 13 charatcers");
      }
      if (values.tin.length !== 15) {
        return console.log("tin no. must be 15 characters");
      }
    }
  };

  return (
    <section className="add_employee_container">
      <ToastContainer />
      <h1 className="form_title">Employee Registration</h1>
      <div className="add_employee_row">
        <div className="add_employee_col">
          <label htmlFor="employee_name">Name</label>
          <input
            type="text"
            id="employee_name"
            name="name"
            value={employeeRegCredentials.name}
            onChange={handleFormChange}
            minLength="5"
            maxLength="50"
          />
        </div>
        <div className="add_employee_col">
          <label htmlFor="employee_email">Email</label>
          <input
            type="email"
            id="employee_email"
            name="email"
            value={employeeRegCredentials.email}
            onChange={handleFormChange}
          />
        </div>
      </div>
      <div className="add_employee_row">
        <div className="add_employee_col">
          <label htmlFor="employee_jobtitle">Job title</label>
          <select
            type="text"
            id="jobtitle"
            name="job_title"
            value={employeeRegCredentials.job_title}
            onChange={handleFormChange}
          >
            <option name="job_title" value="Level 1">
              Level 1
            </option>
            <option name="job_title" value="Level 2">
              Level 2
            </option>
            <option name="job_title" value="Junior Asociate">
              Level 3
            </option>
            <option name="job_title" value="Senior Associate">
              Junior Associate
            </option>
          </select>
        </div>
        <div className="add_employee_col">
          <label htmlFor="employee_date hired">Date hired</label>
          <input
            type="date"
            id="employee_date hired"
            name="hire_date"
            value={employeeRegCredentials.hire_date}
            onChange={handleFormChange}
          />
        </div>
      </div>
      <div className="add_employee_row">
        <div className="add_employee_col">
          <label htmlFor="employee_department">Department</label>

          <select
            id="employee_department"
            name="department"
            value={employeeRegCredentials.department}
            onChange={handleFormChange}
          >
            <option name="department" value="Tech">
              Tech
            </option>
            <option name="department" value="Admin/Mgmt">
              Admin/Mgmt
            </option>
          </select>
        </div>
        <div className="add_employee_col">
          <label htmlFor="employee_jobstatus">Job Status</label>

          <select
            id="employee_jobstatus"
            name="status"
            value={employeeRegCredentials.status}
            onChange={handleFormChange}
          >
            <option name="status" value="Full-Time">
              Full-Time
            </option>
            <option name="status" value="Part-Time">
              Part-Time
            </option>
          </select>
        </div>
      </div>
      <div className="add_employee_row">
        <div className="add_employee_col">
          <label htmlFor="employee_tin">Tin No.</label>
          <input
            type="text"
            id="employee_tin"
            name="tin"
            value={employeeRegCredentials.tin}
            onChange={handleFormChange}
            minLength="15"
            maxLength="15"
          />
        </div>
        <div className="add_employee_col">
          <label htmlFor="employee_snnit">SNNIT No.</label>
          <input
            type="text"
            id="employee_snnit"
            name="snnit"
            value={employeeRegCredentials.snnit}
            onChange={handleFormChange}
            minLength="13"
            maxLength="13"
          />
        </div>
      </div>

      <input
        type="button"
        id="register_button"
        value="Register"
        onClick={submitHandler}
      />

      <p className="footnote"></p>
    </section>
  );
}
