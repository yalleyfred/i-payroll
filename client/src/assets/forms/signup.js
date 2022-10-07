import { useState } from "react";
import { Link } from "react-router-dom";
import "../css/common_styles.css";
import "../css/form.css";

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

  const formHandler = (e) => {
    // console.log(e.target.value);
    const { name, value } = e.target;
    setLoginCredentials({ ...loginCredentials, [name]: value });
    // console.log(loginCredentials);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setFormErrors(validate(loginCredentials));
    setIsSubmit(true);
    submit();
  };

  // useEffect(() => {

  const submit = () => {
    if (Object.keys(formerrors).length === 0 && isSubmit) {
      axios
        .post("http://localhost:3001/api/v1/users/register", loginCredentials)
        .then(function (response) {
          if (response.status === 200) {
            console.log("sent Successfully");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  // });

  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Email is required";
    }
    if (!values.name) {
      errors.name = "Username is required";
    }

    if (!values.password) {
      errors.password = "Password is required";
    }
    if (values.password !== values.confirmPassword) {
      errors.password = "Confirm password must match";
    }
    if (values.password.length < 6) {
      errors.password = "Password is required";
    }
    return errors;
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
          <pre>{JSON.stringify(loginCredentials)}</pre>
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
            <Link className="link">Register a new account</Link>
          </p>
        </form>
      </div>
    </section>
  );
}
