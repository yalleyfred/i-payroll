import { NavLink } from "react-router-dom";
import "../css/common_styles";
import "../css/form.css";

export function Signup() {
  return (
    <section ClassName="login-section">
      <div>
        <h1 ClassName="login-heading-text">iPayroll</h1>
        <h6>RGISTER YOUR IPAYROLL ACCOUNT</h6>
        <div ClassName="login-illustration">
          <img
            src="../../img/icons/visualization.svg"
            alt="an illustration representing data visualization"
          />
        </div>
      </div>
      <div>
        <form ClassName="signup-form">
          <div ClassName="input-group">
            <div>
              <label for="email">Email</label>
              <input type="email" ClassName="" id="signup_email" />
            </div>
            <div>
              <label for="email">Username</label>
              <input type="text" ClassName="" id="signup_username" />
            </div>
          </div>

          <div ClassName="input-group">
            <div>
              <label for="password">Password</label>
              <input type="password" ClassName="signup_password" />
            </div>
            <div>
              <label for="password">Confirm Password</label>
              <input type="password" ClassName="signup_password" />
            </div>
          </div>

          <input type="button" value="Signup now" ClassName="signup_button" />
          <p ClassName="form-medium-text">
            &nbsp;
            <NavLink href="#">Register a new account</NavLink>
          </p>
        </form>
      </div>
    </section>
  );
}
