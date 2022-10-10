import "../css/common_styles.css";
import "../css/reset_password.css";

export function EmployeePayForm() {
  return (
    <section className="reset_password_container">
      <div className="reset_password__row">
        <h1 className="form_title" id="forgot_password_title">
          Payslip Form
        </h1>
        <div className="reset_password__col">
          <div>
            <label for="old_password">Name</label>
            <input type="text" id="name" />
          </div>

          <div>
            <label for="old_password">Pay Date</label>
            <input type="text" id="name" />
          </div>

          <input type="button" id="reset_button" value="Submit" />
        </div>
      </div>
    </section>
  );
}
