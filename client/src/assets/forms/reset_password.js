import "../css/common_styles.css";
import "../css/reset_password.css";

export function ResetPassword() {
  return (
    <section className="reset_password_container">
      <h1 className="form_title">Reset Password</h1>
      <div className="reset_password__row">
        <div className="reset_password__col">
          <div>
            <label for="old_password">Old Password</label>
            <input type="password" id="old_password" />
          </div>

          <div>
            <label for="password">New Password</label>
            <input type="password" id="new_password" />
          </div>

          <div>
            <label for="password">Confirm New Password</label>
            <input type="password" id="confirm_new_password" />
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
