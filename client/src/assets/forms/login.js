import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../css/common_styles.css";
import "../css/form.css";

import "react-toastify/dist/ReactToastify.css";

import { notification } from "../js/script";
import { ToastContainer } from "react-toastify";

const axios = require("axios").default;

export default function LoginForm() {
  // const location = useLocation();
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    password: "",
  };

  const [loginCredentials, setLoginCredentials] = useState(initialValues);
  const [formerrors, setFormErrors] = useState({});
  // const [isSubmit, setIsSubmit] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [token, setToken] = useState("");

  // const successAlert = new notification();
  const errorAlert = new notification();

  const formHandler = (e) => {
    const { name, value } = e.target;
    setLoginCredentials({ ...loginCredentials, [name]: value });
  };

  // useEffect(() => {

  const submit = () => {
    axios
      .post("http://localhost:3001/api/v1/users/login", loginCredentials)

      .then(function (response) {
        if (response.status === 200) {
          // errorAlert.notifySuccess(response);
          // setToken(response.data.token);
          // console.log(response.data.token);
          console.log(response);
          if (response.data.token) {
            navigate("/admin/account");
          }
        }
      })
      .catch(function (error) {
        errorAlert.notifyError(error.response.data);
        // console.log(error);
        return;
      });
  };
  // });

  const validate = (values) => {
    if (!values.email && !values.password && !values.password < 6) {
      // errorAlert.notifyError("All fields required!");
      return;
    }

    if (!values.email) {
      // errorAlert.notifyError("Email is required");
      return;
    }

    if (!values.password) {
      // errorAlert.notifyError("Password is required");
      return;
    }
    if (values.password.length < 6) {
      // errorAlert.notifyError("Password must be at least 6 characters");
      return;
    }
    return formerrors;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setFormErrors(validate(loginCredentials));
    // setIsSubmit(true);
    submit();
  };
  return (
    <section className="login-section">
      <div>
        <h1 className="login-heading-text">iPayroll</h1>
        <h6>A MODERN PAYROLL SYSTEM</h6>
        <div className="login-illustration">
          <img
            src={require("../img/icons/visualization.svg").default}
            alt="an illustration representing data visualization"
          />
        </div>
      </div>
      <div>
        <form className="login-form">
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          {/* Same as */}
          <ToastContainer />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="login_email"
            className="form-input"
            name="email"
            value={loginCredentials.email}
            onChange={formHandler}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="login_password"
            className="form-input"
            name="password"
            value={loginCredentials.password}
            onChange={formHandler}
          />
          <input
            type="submit"
            value="Login now"
            className="login_button form-input"
            onClick={submitHandler}
          />
          <p className="form-medium-text">
            &nbsp;
            <Link to={"/signup"} className="link" target="_blank">
              Register
            </Link>
            &nbsp;|&nbsp;
            <Link to={"/forgotpassword"} className="link" target="_blank">
              Forgot Password
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
