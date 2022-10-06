import React from "react";
import { NavLink } from "react-router-dom";
import "../css/common_styles.css";
import "../css/index.css";
// import $ from "jquery";
import "datatables.net";
import { Barchart } from "../components/chart";

// $(document).ready(function () {
//   $("#table_id").DataTable();
// });

export default function Employees() {
  return (
    <div>
      <section className="employees-summary-section">
        <div role="presentation">
          <NavLink to="#modal-full" uk-toggle className="navlink">
            <button className="add-btn" title="Click to add new employee">
              <img src={require("../img/icons/add_icon.svg").default} alt="" />
            </button>
          </NavLink>
        </div>
        <div>
          <div className="employee-summary-card">
            <div>
              <p>NO. OF EMPLOYEES</p>
              <h3>250</h3>
            </div>
            <div>
              <img
                src={require("../img/icons/employees_icon.svg").default}
                alt=""
              />
            </div>
          </div>
          <div className="employee-summary-card">
            <div>
              <p>AVERAGE. EARNING</p>

              <h3>
                <span className="small-text">GHC</span>2500
              </h3>
            </div>
            <div>
              <img src={require("../img/icons/ages.svg").default} alt="" />
            </div>
          </div>
          <div className="employee-summary-card">
            <div>
              <p>AVERAGE. DEDUCTION</p>
              <h3>
                <span className="small-text">GHC</span>985
              </h3>
            </div>
            <div>
              <img src={require("../img/icons/salary.svg").default} alt="" />
            </div>
          </div>
          <div className="employee-summary-card">
            <div>
              <p>TOTAL NET SALARY</p>
              <h3>
                <span className="small-text">GHC</span>70000
              </h3>
            </div>
            <div>
              <img src={require("../img/icons/salary.svg").default} alt="" />
            </div>
          </div>
        </div>
      </section>

      <section className="employees-detail-section">
        <div>
          <table id="table_id" className="display">
            <thead>
              <tr>
                <th>No.</th>
                <th>Date Hired</th>
                <th>Name</th>
                <th>Email</th>
                <th>Job title</th>
                <th>Department</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>02/09/2001</td>
                <td>Enoch Boison</td>
                <td>enochboison@amalitech.org</td>
                <td>Frontend Developer</td>
                <td>Information Technology</td>
              </tr>
              <tr>
                <td>2</td>
                <td>03/06/2004</td>
                <td>Fredrick Yalley</td>
                <td>fredrick.yalley@amalitech.org</td>
                <td>Backend Developer</td>
                <td>Information Technology</td>
              </tr>
              <tr>
                <td>3</td>
                <td>03/04/2006</td>
                <td>Emmanuel Mensah</td>
                <td>emmanuel.mensah@amalitech.org</td>
                <td>Frontend Developer</td>
                <td>Information Technology</td>
              </tr>
              <tr>
                <td>4</td>
                <td>03/04/2006</td>
                <td>Theophilus Gordon</td>
                <td>theophilus.gordon@amalitech.org</td>
                <td>FullStack Developer</td>
                <td>Information Technology</td>
              </tr>
              <tr>
                <td>5</td>
                <td>03/04/2006</td>
                <td>Edward Djirakor</td>
                <td>edward.djirakor@amalitech.org</td>
                <td>Backend Developer</td>
                <td>Information Technology</td>
              </tr>
              <tr>
                <td>6</td>
                <td>03/04/2006</td>
                <td>Nicolas Ocran</td>
                <td>nicolas.ocran@amalitech.org</td>
                <td>Frontend Developer</td>
                <td>Information Technology</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div id="chart">
          <Barchart />
        </div>
      </section>

      <div id="modal-full" className="uk-modal-full" uk-modal>
        <div className="uk-modal-dialog">
          <button
            className="uk-modal-close-full uk-close-large"
            type="button"
            uk-close
          ></button>
          <div
            className="uk-grid-collapse uk-child-width-1-1@s uk-flex-middle"
            uk-grid
          >
            <div className=".uk-width-1-1" uk-height-viewport>
              <iframe
                // src={require("./forms/employee_registration_form.html").default}
                id="popOver"
                title="display the new employee registration form"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
