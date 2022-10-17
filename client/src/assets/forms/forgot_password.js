import { useState } from "react";
import "../css/common_styles.css";
import "../css/forgot_password.css";
// import { useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

import { notification } from "../js/script";
import { ToastContainer } from "react-toastify";

const axios = require("axios").default;

export function ForgotPassword() {
  // const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");

  const successAlert = new notification();
  const errorAlert = new notification();

  const handleform = (e) => {
    setUserEmail(e.target.value);
    // console.log(userEmail);
  };

  const SubmitForm = () => {
    axios
      .post("http://localhost:5000/api/v1/users/forgotPassword", {
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
        {/* className="form_title" */}
        <h1 id="forgot_password_title">Forgot Password</h1>
        <h4 className="forgot_password_title-2">Oops! forgot your password?</h4>
        <p className="forgot_password_text">
          Enter your email below,we'll send you a ticket to retrieve it.
        </p>
        <div className="forgot_password__col">
          <div>
            <label for="old_password">Email</label>
            <input
              type="email"
              id="old_password"
              name="email"
              value={userEmail}
              onChange={handleform}
            />
            <input
              type="button"
              id="send_email_button"
              value={"Send email"}
              onClick={SubmitForm}
            />
          </div>
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
