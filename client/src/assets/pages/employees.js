import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/common_styles.css";
import "../css/employees.css";
// import "datatables.net";
import { Barchart } from "../components/chart";
import moment from "moment-timezone/builds/moment-timezone-with-data-2012-2022";

import "bootstrap/dist/css/bootstrap.min.css";
// import Table from "react-bootstrap/Table";

const axios = require("axios").default;
export let titles = [];

export default function Employees() {
  const [employeeInfo, setEmployeeInfo] = useState([]);
  const [noEmployees, setNoEmployees] = useState(0);
  const [salaryData, setSalaryData] = useState([]);
  const [avgSalary, setAvgSalary] = useState(0);
  const [avgAllowance, setAvgAllowance] = useState(0);

  useEffect(() => {
    const handle_employeeData = async () => {
      await axios
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
    };
    handle_employeeData();

    const handleSalaryData = async () => {
      await axios
        .get("http://localhost:3001/api/v1/payScheme")
        .then((response) => {
          if (response.status === 200) {
            setSalaryData(response.data.pay);

            let basic_salary = salaryData.map((item) => {
              if (item.job_title) {
                return item.basic_salary;
              }
              return item.basic_salary;
            });
            let unique_basic_salary = [...new Set(basic_salary)];
            const averageSal = unique_basic_salary.reduce((prev, curr) => {
              return Math.round((prev + curr) / unique_basic_salary.length);
            });
            setAvgSalary(averageSal);
          }

          let allowance = salaryData.map((item) => {
            if (item.job_title) {
              return item.allowance;
            }
            return item.allowance;
          });
          let unique_allowance = [...new Set(allowance)];
          const averageall = unique_allowance.reduce((prev, curr) => {
            return Math.round((prev + curr) / unique_allowance.length);
          });
          setAvgAllowance(averageall);
        })
        .catch((error) => {
          throw new Error(error);
        });
    };
    handleSalaryData();
  });

  const caller = () => {
    // handle_employeeData();
    // handleSalaryData();
    window.location.reload();
  };
  return (
    <div id="employee-summary-presentation">
      <section className="employees-summary-section">
        <div role="presentation">
          <Link uk-toggle className="navlink" onClick={caller}>
            <button className="add-btn" title="Click refresh employee data">
              <img src={require("../img/icons/refresh.svg").default} alt="" />
            </button>
          </Link>

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
              <p>AVERAGE. BASIC SALARY</p>

              <h3>
                <span className="small-text">GHC</span>
                {avgSalary}.00
              </h3>
            </div>
            <div>
              <img src={require("../img/icons/ages.svg").default} alt="" />
            </div>
          </div>
          <div className="employee-summary-card">
            <div>
              <p>AVERAGE. ALLOWANCE</p>
              <h3>
                <span className="small-text">GHC</span>
                {avgAllowance}.00
              </h3>
            </div>
            <div>
              <img src={require("../img/icons/salary.svg").default} alt="" />
            </div>
          </div>
          <div className="employee-summary-card">
            <div>
              <p>ESTIMATED AVG. EARNING</p>
              <h3>
                <span className="small-text">GHC</span>
                {Number(avgSalary) + Number(avgAllowance)}.00
              </h3>
            </div>
            <div>
              <img src={require("../img/icons/earning.svg").default} alt="" />
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
                : "loading.."}
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
