import { NavLink } from "react-router-dom";
import "../css/common_styles";
import "../css/form.css";

export function LoginForm() {
  return (
    <section ClassName="login-section">
      <div>
        <h1 ClassName="login-heading-text">iPayroll</h1>
        <h6>A MODERN PAYROLL SYSTEM</h6>
        <div ClassName="login-illustration">
          <img
            src={require("../../img/icons/visualization.svg").default}
            alt="an illustration representing data visualization"
          />
        </div>
      </div>
      <div>
        <form ClassName="login-form">
          <label for="email">Email</label>
          <input type="email" id="login_email" ClassName="form-input" />

          <label for="password">Password</label>
          <input type="password" id="login_password" ClassName="form-input" />
          <input
            type="button"
            value="Login now"
            ClassName="login_button form-input"
          />
          <p ClassName=" form-medium-text">
            &nbsp;
            <NavLink href="#">Register a new account</NavLink>
          </p>
        </form>
      </div>
    </section>
  );
}
