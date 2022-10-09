import "../css/common_styles.css";
import "../css/reset_password.css";

export function ForgotPasswrd() {
  return (
    <section className="reset_password_container">
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
            <input type="email" id="old_password" />
          </div>

          <input type="button" id="reset_button" value="Reset" />
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
