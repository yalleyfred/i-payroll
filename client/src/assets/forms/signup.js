import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../css/common_styles.css";
import "../css/signup.css";

import "react-toastify/dist/ReactToastify.css";

import { notification } from "../js/script";
import { ToastContainer } from "react-toastify";

const axios = require("axios").default;

export default function Signup() {
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    password2: "",
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

  const submit = () => {
    if (isSubmit) {
      axios
        .post("http://localhost:5000/api/v1/users/register", loginCredentials)
        .then((response) => {
          if (response.status === 200) {
            // console.log(response);

            axios.post("http://localhost:5000/api/v1/users/login", {
              email: loginCredentials.email,
              password: loginCredentials.password,
            });
            successAlert.notifySuccess(response.data.message);
            successAlert.notifySuccess(response.data.message);
            localStorage.setItem("email", loginCredentials.email);
            localStorage.setItem("session_token", response.data.token);
            if (localStorage.getItem("session_token")) {
              navigate("/admin/account");
            } else {
              navigate("/");
            }
          }
        })
        .catch((error) => {
          errorAlert.notifyError(error.response.data);
          return localStorage.clear();
        });
      // .then((response) => {
      // axios
      //   .post("http://localhost:3001/api/v1/users/login", {
      //     email: loginCredentials.email,
      //     password: loginCredentials.password,
      //   })

      // .then((response) => {
      // successAlert.notifySuccess(response.data.message);
      // localStorage.setItem("email", loginCredentials.email);
      // localStorage.setItem("session_token", response.data.token);
      // if (localStorage.getItem("session_token")) {
      //   navigate("/admin/account");
      // }
      // })
      // .catch((error) => {
      //   errorAlert.notifyError(error.response.data);
      //   return localStorage.clear();
      // });
      // })
      // .catch((error) => {
      //   errorAlert.notifyError(error.response.data);
      //   // console.log(error);
      // });
    }
  };

  const validate = (values) => {
    if (
      !values.email &&
      !values.name &&
      !values.password &&
      !values.password2 &&
      !values.password < 6
    ) {
      return;
      // return errorAlert.notifyError("All fields required!");
    }

    // if (!values.email) {
    //   return errorAlert.notifyError("Email is required");
    // }
    // if (!values.name) {
    //   return errorAlert.notifyError("Username is required");
    // }

    // if (!values.password) {
    //   return errorAlert.notifyError("Password is required");
    // }
    // if (values.password !== values.password2) {
    //   return errorAlert.notifyError("Confirm password must match");
    // }
    // if (values.password.length < 6) {
    //   return errorAlert.notifyError("Password must be at least 6 characters");
    // }
    return formerrors;
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
        <form className="signup-form">
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
                name="password2"
                id="confirm_password"
                className="signup_password"
                value={loginCredentials.password2}
                onChange={formHandler}
              />
            </div>
          </div>

          <input
            type="submit"
            value="Signup now"
            className="signup_button"
            onClick={submitHandler}
          />
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
