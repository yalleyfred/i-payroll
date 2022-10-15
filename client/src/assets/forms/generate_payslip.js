import { useState } from "react";
import { Link } from "react-router-dom";
import "../css/common_styles.css";
import "../css/generate_payslip_Form.css";

import "react-toastify/dist/ReactToastify.css";
import { notification } from "../js/script";
import { ToastContainer } from "react-toastify";

const axios = require("axios").default;

const successAlert = new notification();
const errorAlert = new notification();

export function GeneratePayslip() {
  const [payeeName, setPayeeName] = useState("");

  const handleChange = (e) => {
    setPayeeName(e.target.value);
  };

  const handleSubmit = () => {
    // console.log(payeeName);

    axios
      .post("http://localhost:5000/api/v1/payslip", {
        name: payeeName,
      })

      .then(function (response) {
        if (response.status === 201) {
          if (response.data.status === "success") {
            successAlert.notifySuccess(response.data.status);
            console.log(response);
          }
        }
      })
      .catch(function (error) {
        errorAlert.notifyError(error.response.data);
        console.log(error);
        return;
      });

    setPayeeName("");
  };
  return (
    <section className="generate_payslip__container">
      <ToastContainer />
      <Link to="/admin/payroll">
        <button
          class="uk-button uk-button-danger uk-position-top-right uk-margin-large-top uk-margin-large-right close"
          title="Close"
        >
          x
        </button>
      </Link>

      <div class="generate_payslip__row">
        <h1 class="generate_payslip_title">Payslip Form</h1>
        <div class="generate_payslip__col">
          <div>
            <label for="old_password">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={payeeName}
              onChange={handleChange}
            />
          </div>

          <div>
            <input
              type="button"
              id="reset_button"
              value="Generate Payslip"
              onClick={handleSubmit}
            />
          </div>
        </div>

        <p class="generate_payslip_footnote">
          {/* <a> */}
          Already have an account? Login now
          {/* </a> */}
        </p>
      </div>
    </section>
  );
}
