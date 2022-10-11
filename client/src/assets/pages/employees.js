import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../css/common_styles.css";
import "../css/index.css";
import "datatables.net";
import { Barchart } from "../components/chart";
import moment from "moment-timezone/builds/moment-timezone-with-data-2012-2022";

import "bootstrap/dist/css/bootstrap.min.css";
// import Table from "react-bootstrap/Table";

const axios = require("axios").default;
export let titles = [];

export default function Employees() {
  const [employeeInfo, setEmployeeInfo] = useState([]);
  const [noEmployees, setNoEmployees] = useState(0);

  useEffect(() => {
    const handle_employeeData = async () => {
      setTimeout(() => {
        axios
          .get("http://localhost:3001/api/v1/employees")
          .then((response) => {
            if (response.status === 200) {
              setEmployeeInfo(response.data.employee);
              setNoEmployees(response.data.employee.length);
            }
          })
          .catch((error) => {
            throw new Error(error);
          });
      }, 5000);
    };
    handle_employeeData();
  }, []);
  return (
    <div id="employee-summary-presentation">
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
              <h3>{noEmployees}</h3>
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
        <div class="uk-overflow-auto">
          <table class="uk-table uk-table-small uk-table-striped">
            <thead>
              <tr>
                <th className="uk-text-lead">No.</th>
                <th className="uk-text-lead">Date Hired</th>
                <th className="uk-text-lead">Name</th>
                <th className="uk-text-lead">Email</th>
                <th className="uk-text-lead">Job title</th>
                <th className="uk-text-lead">Department</th>
              </tr>
            </thead>
            <tbody>
              {employeeInfo.length > 0
                ? employeeInfo.map((value, index) => {
                    return (
                      <tr className="uk-text-default" key={index}>
                        <td className="uk-text-default">{value.id}</td>
                        <td className="uk-text-default">
                          {moment(value.hire_date).format("MMMM, YYYY")}
                        </td>
                        <td className="uk-text-default">{value.name}</td>
                        <td className="uk-text-default">{value.email}</td>
                        <td className="uk-text-default">{value.job_title}</td>
                        <td className="uk-text-default">{value.department}</td>
                      </tr>
                    );
                  })
                : "Loading.."}
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
