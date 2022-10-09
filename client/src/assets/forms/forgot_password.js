import { useState } from "react";
import "../css/common_styles.css";
import "../css/reset_password.css";
import { useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

import { notification } from "../js/script";
import { ToastContainer } from "react-toastify";

const axios = require("axios").default;

export function ForgotPassword() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");

  const successAlert = new notification();
  const errorAlert = new notification();

  const handleform = (e) => {
    setUserEmail(e.target.value);
    // console.log(userEmail);
  };

  const SubmitForm = () => {
    axios
      .post("http://localhost:3001/api/v1/users/forgotPassword", {
        email: userEmail,
      })

      .then(function (response) {
        if (response.status === 200) {
          if (response.data.status === "success") {
            successAlert.notifySuccess(response.data.status);
            //   window.location.href = "http://localhost:3001/resetpassword/:token";
            // navigate("/login");
            // }
          }
        }
      })
      .catch(function (error) {
        errorAlert.notifyError(error.response.data);
        // console.log(error);
        return;
      });
  };
  return (
    <section className="reset_password_container">
      <ToastContainer />
      <div className="reset_password__row">
        <h1 className="form_title" id="forgot_password_title">
          Forgot Password
        </h1>
        <h4>Oops! forgot your password?</h4>
        <p className="forget_password_text">
          Enter your email below,we'll send you a ticket to retrieve it.
        </p>
        <div className="reset_password__col">
          <div>
            <label for="old_password">Email</label>
            <input
              type="email"
              id="old_password"
              name="email"
              value={userEmail}
              onChange={handleform}
            />
          </div>

          <input type="button" id="reset_button" onClick={SubmitForm} />
        </div>
      </div>

      <p className="footnote">
        {/* <a> */}
        Already have an account? Login now
        {/* </a> */}
      </p>
    </section>
  );
}
