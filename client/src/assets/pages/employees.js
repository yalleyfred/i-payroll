import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../css/common_styles.css";
import "../css/index.css";
// import $ from "jquery";
import "datatables.net";
import { Barchart } from "../components/chart";
import moment from "moment-timezone/builds/moment-timezone-with-data-2012-2022";
import { employees_url } from "../js/api/requests";

import Table from "react-bootstrap/Table";

const axios = require("axios").default;

export default function Employees() {
  const [employeeInfo, setEmployeeInfo] = useState([]);

  useEffect(() => {
    axios
      .get(employees_url)
      .then((response) => {
        // console.log(response);
        if (response.status === 200) {
          setEmployeeInfo(response.data.employee);
          // console.log(response.data.employee);
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  }, [employeeInfo]);

  return (
    <div style={{ height: "100%", marginBottom: "40px" }}>
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
          <Table striped hover>
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
              {employeeInfo.length > 0
                ? employeeInfo.map((value, index) => {
                    // console.log(value.date_hired);
                    return (
                      <tr key={index}>
                        <td>{value.id}</td>
                        <td>{moment(value.hire_date).format("MM-DD-YYYY")};</td>
                        <td>{value.name}</td>
                        <td>{value.email}</td>
                        <td>{value.job_title}</td>
                        <td>{value.department}</td>
                      </tr>
                    );
                  })
                : "Loading.."}
            </tbody>
          </Table>
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
