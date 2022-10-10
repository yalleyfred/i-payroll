import "../css/common_styles.css";
import "../css/add_employee_form.css";

export function Employee_reg() {
  return (
    <section>
      <form>
        <h1>New Employee Registration</h1>
        <section className="new_employee_form_container">
          <div className="new_employee_form-row">
            <label for="new_employee_name">Name</label>
            <input type="text" id="new_employee_name" />

            <label for="new_employee_jobtitle">Job title</label>
            <select id="new_employee_jobtitle">
              <option>level 1 Associate</option>
              <option>level 2 Associate</option>
              <option>level 3 Associate</option>
            </select>

            <label for="new_employee_department">Department</label>
            <select id="new_employee_department">
              <option>IT</option>
              <option>HR</option>
              <option>Administrative</option>
              <option>Marketing</option>
            </select>

            <label for="new_employee_tin">TIN No.</label>
            <input type="text" id="new_employee_tin" />
          </div>

          <div className="new_employee_row">
            <label for="new_employee_email">Email</label>
            <input type="text" id="new_employee_emails" />

            <label for="date_hired">Date Hired</label>
            <div className="date_hired_container">
              <input
                type="text"
                // id="new_employee_month_hired"
                id="date_hired"
              />
              <input
                type="number"
                id="new_employee_year_hired"
                min="1900"
                max="2099"
              />
            </div>

            <label for="new_employee_month_jobstatus">Job Status</label>
            <select id="new_employee_jobstatus">
              <option>Full-time</option>
              <option>Part-time</option>
            </select>

            <label for="new_employee_month_snnit">SNNIT No.</label>
            <input type="text" id="new_employee_month_snnit" />
          </div>
        </section>

        <div className="new_employee_form_user_action">
          <button id="new_employee_create_btn">Create Account</button>
          <p className="login_info">
            {/* <a href="#"> */}
            Already have an account? Login now
            {/* </a> */}
          </p>
        </div>
      </form>
    </section>
  );
}
