import { Link } from "react-router-dom";
import "../css/common_styles.css";
import "../css/form.css";

export default function LoginForm() {
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
          <label htmlFor="email">Email</label>
          <input type="email" id="login_email" className="form-input" />

          <label htmlFor="password">Password</label>
          <input type="password" id="login_password" className="form-input" />
          <input
            type="button"
            value="Login now"
            className="login_button form-input"
          />
          <p className="form-medium-text">
            &nbsp;
            <Link to={"/signup"} className="link">
              Register a new account
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
