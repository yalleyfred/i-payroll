import { useState } from "react";
import "../css/common_styles.css";
import "../css/payslip_form.css";
import { Link } from "react-router-dom";

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
    console.log(employeePayCredentials);
    submit();
    setEmployeePayCredentials({
      name: "",
      month_year: "",
    });
  };
  const successAlert = new notification();
  const errorAlert = new notification();

  const submit = () => {
    axios
      .post("http://localhost:5000/api/v1/payroll", employeePayCredentials)
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          successAlert.notifySuccess(response.data.status);
        }
      })
      .catch((error) => {
        errorAlert.notifyError(error.response.data);
        console.log(error);
      });
  };

  return (
    <section className="payroll_form__container">
      <ToastContainer />
      <Link to="/admin/payroll">
        <button
          class="uk-button uk-button-danger uk-position-top-right uk-margin-large-top uk-margin-large-right close"
          title="Close"
        >
          x
        </button>
      </Link>

      <div className="payroll_form__row">
        <h1 id="payroll_form_container_title">Payroll Form</h1>
        <div className="payroll_form__col">
          <div>
            <label for="payroll_form_name">Name</label>
            <input
              type="text"
              id="payee_name"
              name="name"
              value={employeePayCredentials.name}
              onChange={handleFormchange}
            />
          </div>

          <div>
            <label for="payee_name">Pay Date</label>
            <input
              type="month"
              id="payee_name"
              name="month_year"
              value={employeePayCredentials.month_year}
              onChange={handleFormchange}
            />
          </div>

          <div>
            <input
              type="button"
              id="reset_button"
              value="Submit"
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
