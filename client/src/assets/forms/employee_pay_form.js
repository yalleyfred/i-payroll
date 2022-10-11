import { useState } from "react";
import "../css/common_styles.css";
import "../css/payslip_form.css";

import "react-toastify/dist/ReactToastify.css";
import { notification } from "../js/script";
import { ToastContainer } from "react-toastify";

export function EmployeePayForm() {
  const axios = require("axios").default;

  const initialValues = {
    name: "",
    month_year: "",
  };
  const [employeePayCredentials, setEmployeePayCredentials] =
    useState(initialValues);

  const handleFormchange = (e) => {
    const { name, value } = e.target;
    setEmployeePayCredentials({ ...employeePayCredentials, [name]: value });
  };

  const handleSubmit = () => {
    // console.log(employeePayCredentials);
    submit();
  };
  const successAlert = new notification();
  const errorAlert = new notification();

  const submit = () => {
    axios
      .post("http://localhost:3001/api/v1/payroll", employeePayCredentials)
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          successAlert.notifySuccess(response.data);
        }
      })
      .catch((error) => {
        errorAlert.notifyError(error.response.data);
        // console.log(error.response.data);
      });
  };

  return (
    <section className="payslip_container">
      <ToastContainer />
      <div className="payslip_container__row">
        <h1 className="form_title" id="payslip_container_title">
          Payroll Form
        </h1>
        <div className="payslip_container__col">
          <div>
            <label for="payslip_name">Name</label>
            <input
              type="text"
              id="payslip_name"
              name="name"
              value={employeePayCredentials.name}
              onChange={handleFormchange}
            />
          </div>

          <div>
            <label for="payslip_name">Pay Date</label>
            <input
              type="date"
              id="payslip_name"
              name="month_year"
              value={employeePayCredentials.month_year}
              onChange={handleFormchange}
            />
          </div>

          <input
            type="button"
            id="reset_button"
            value="Submit"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </section>
  );
}
