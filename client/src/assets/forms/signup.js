import { useState } from "react";
import { Link } from "react-router-dom";
import "../css/common_styles.css";
import "../css/form.css";

import "react-toastify/dist/ReactToastify.css";

import { notification } from "../js/script";
import { ToastContainer } from "react-toastify";

const axios = require("axios").default;

export default function Signup() {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [loginCredentials, setLoginCredentials] = useState(initialValues);
  const [formerrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const successAlert = new notification();
  const errorAlert = new notification();

  const formHandler = (e) => {
    const { name, value } = e.target;
    setLoginCredentials({ ...loginCredentials, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setFormErrors(validate(loginCredentials));
    setIsSubmit(true);
    submit();
  };

  // useEffect(() => {

  const submit = () => {
    if (isSubmit) {
      axios
        .post("http://localhost:3001/api/v1/users/register", loginCredentials)
        .then(function (response) {
          if (response.status === 200) {
            successAlert.notifySuccess(response.data);
          }
        })
        .catch(function (error) {
          errorAlert.notifySuccess(error.response.data);
        });
    }
  };
  // });

  const validate = (values) => {
    if (
      !values.email &&
      !values.name &&
      !values.password &&
      !values.confirmPassword &&
      !values.password < 6
    ) {
      errorAlert.notifyError("All fields required!");
      return;
    }

    if (!values.email) {
      errorAlert.notifyError("Email is required");
      return;
    }
    if (!values.name) {
      errorAlert.notifyError("Username is required");
      return;
    }

    if (!values.password) {
      errorAlert.notifyError("Password is required");
      return;
    }
    if (values.password !== values.confirmPassword) {
      errorAlert.notifyError("Confirm password must match");
      return;
    }
    if (values.password.length < 6) {
      errorAlert.notifyError("Password must be at least 6 characters");
      return;
    }
  };

  return (
    <section className="login-section">
      <div>
        <h1 className="login-heading-text">iPayroll</h1>
        <h6>RGISTER YOUR IPAYROLL ACCOUNT</h6>
        <div className="login-illustration">
          <img
            src={require("../img/icons/visualization.svg").default}
            alt="an illustration representing data visualization"
          />
        </div>
      </div>
      <div>
        <form className="signup-form" onSubmit={submitHandler}>
          <ToastContainer />
          <div className="input-group">
            <div>
              <label htmlFor="signup_email">Email</label>
              <input
                type="email"
                name="email"
                className=""
                id="signup_email"
                value={loginCredentials.email}
                onChange={formHandler}
              />
            </div>
            <div>
              <label htmlFor="signup_username">Username</label>
              <input
                type="text"
                name="name"
                className=""
                id="signup_username"
                value={loginCredentials.name}
                onChange={formHandler}
              />
            </div>
          </div>

          <div className="input-group">
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                className="signup_password"
                id="signup_password"
                value={loginCredentials.password}
                onChange={formHandler}
              />
            </div>
            <div>
              <label htmlFor="confirm_password">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                id="confirm_password"
                className="signup_password"
                value={loginCredentials.confirmPassword}
                onChange={formHandler}
              />
            </div>
          </div>

          <input type="submit" value="Signup now" className="signup_button" />
          <p className="form-medium-text">
            &nbsp;
            <Link to={"/login"} className="link">
              Login existing account
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
