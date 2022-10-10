import { useState } from "react";
import "../css/common_styles.css";
import "../css/reset_password.css";

import { notification } from "../js/script";
import { ToastContainer } from "react-toastify";

export function ResetPassword() {
  const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const [resetCredentials, setResetCredentials] = useState(initialValues);

  const successAlert = new notification();
  const errorAlert = new notification();

  const formReset = (e) => {
    const { name, value } = e.target;
    setResetCredentials({ ...resetCredentials, [name]: value });
  };

  const validate = (values) => {
    if (!(values.oldPassword === values.newPassword)) {
      return errorAlert.notifySuccess(
        "Confirm Password does not match Primary Password"
      );
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    validate(resetCredentials);
  };

  return (
    <section className="reset_password_container">
      <ToastContainer />
      <h1 className="form_title">Reset Password</h1>
      <div className="reset_password__row">
        <div className="reset_password__col">
          <div>
            <label for="old_password">Old Password</label>
            <input
              type="password"
              id="old_password"
              name="oldPassword"
              value={resetCredentials.oldPassword}
              onChange={formReset}
            />
          </div>

          <div>
            <label for="password">New Password</label>
            <input
              type="password"
              id="new_password"
              name="newPassword"
              value={resetCredentials.newPassword}
              onChange={formReset}
            />
          </div>

          <div>
            <label for="password">Confirm New Password</label>
            <input
              type="password"
              id="confirm_new_password"
              name="confirmPassword"
              value={resetCredentials.confirmPassword}
              onChange={formReset}
            />
          </div>

          <input
            type="button"
            id="reset_button"
            value="Reset"
            onClick={submitForm}
          />
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
