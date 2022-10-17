import { useState } from "react";
import "../css/common_styles.css";
import "../css/applyloan_form.css";
import { Link } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import { notification } from "../js/script";
import { ToastContainer } from "react-toastify";

export function ApplyLoan() {
  const axios = require("axios").default;

  const initialValues = {
    name: "",
    amount: "",
    date: "",
  };
  const [loanDetails, setLoanDetails] = useState(initialValues);

  const handleFormchange = (e) => {
    const { name, value } = e.target;
    setLoanDetails({ ...loanDetails, [name]: value });
  };

  const handleSubmit = () => {
    console.log(loanDetails);
    submit();
    setLoanDetails({
      name: "",
      amount: "",
      date: "",
    });
  };
  const successAlert = new notification();
  const errorAlert = new notification();

  const submit = () => {
    axios
      .post("http://localhost:5000/api/v1/loan", loanDetails)
      .then((response) => {
        if (response.status === 200) {
          //   console.log(response);
          successAlert.notifySuccess(response.data.status);
        }
      })
      .catch((error) => {
        errorAlert.notifyError(error.response.data);
        // console.log(error);
      });
  };

  return (
    <section className="loan__container">
      <ToastContainer />

      <Link to="/admin/payroll">
        <button
          class="uk-button uk-button-danger uk-position-top-right uk-margin-large-top uk-margin-large-right close"
          title="Close"
        >
          x
        </button>
      </Link>
      <div className="loan__row">
        <h1 className="loan_title">Loan Application</h1>
        <div className="loan__col">
          <div>
            <label for="loan_name">Name</label>
            <input
              type="text"
              id="loan_name"
              name="name"
              value={loanDetails.name}
              onChange={handleFormchange}
            />
          </div>

          <div>
            <label for="loan_name">Amount</label>
            <input
              type="number"
              id="loan_name"
              name="amount"
              value={loanDetails.amount}
              onChange={handleFormchange}
            />
          </div>

          <div>
            <label for="loan_name">Date</label>
            <input
              type="date"
              id="loan_name"
              name="date"
              value={loanDetails.date}
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
