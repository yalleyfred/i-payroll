import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
          <Link to="/admin/registeremployee" uk-toggle className="navlink">
            <button className="add-btn" title="Click to add new employee">
              <img src={require("../img/icons/add_icon.svg").default} alt="" />
            </button>
          </Link>
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
                <th className="">No.</th>
                <th className="">Date Hired</th>
                <th className="">Name</th>
                <th className="">Email</th>
                <th className="">Job title</th>
                <th className="">Department</th>
              </tr>
            </thead>
            <tbody>
              {employeeInfo.length > 0
                ? employeeInfo.map((value, index) => {
                    return (
                      <tr key={index}>
                        <td>{value.id}</td>
                        <td>{moment(value.hire_date).format("MMMM, YYYY")}</td>
                        <td>{value.name}</td>
                        <td>{value.email}</td>
                        <td>{value.job_title}</td>
                        <td>{value.department}</td>
                      </tr>
                    );
                  })
                : "Loading..."}
            </tbody>
          </table>
        </div>
        <div id="chart">
          <Barchart />
        </div>
      </section>
    </div>
  );
}
