import "../css/common_styles.css";
import "../css/reset_password.css";

export function GeneratePayslip() {
  return (
    <section class="reset_password_container" id="payslip_container">
      <div class="reset_password__row">
        <h1 class="form_title" id="forgot_password_title">
          Payslip Form
        </h1>
        <div class="reset_password__col">
          <div>
            <label for="old_password">Name</label>
            <input type="text" id="name" />
          </div>

          <input type="button" id="reset_button" value="Generate Payslip" />
        </div>

        <p class="footnote">
          {/* <a> */}
          Already have an account? Login now
          {/* </a> */}
        </p>
      </div>
    </section>
  );
}
