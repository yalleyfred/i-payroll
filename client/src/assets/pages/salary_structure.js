import React, { useEffect, useState } from "react";
import "../css/common_styles.css";
// import "../css/index.css";
import "../css/payroll.css";

const axios = require("axios").default;

export default function SalaryStructue() {
  const [salaryData, setSalaryData] = useState([]);

  useEffect(() => {
    const handleSalaryData = async () => {
      axios
        .get("http://localhost:5000/api/v1/payScheme")
        .then((response) => {
          if (response.status === 200) {
            setSalaryData(response.data.pay);
            // console.log(response.data);
          }
        })
        .catch((error) => {
          throw new Error(error);
        });
    };
    handleSalaryData();
  }, []);

  return (
    <section className="payroll_detail_section">
      {/* <Link to="/admin/"> */}
      <p className="uk-margin-top uk-margin-left">
        <button className="uk-button uk-button-danger">Add JOB TITLE</button>
      </p>
      {/* </Link> */}

      <div className="payroll_container">
        <table
          class="uk-table uk-table-large uk-table-striped uk-table-middle"
          id="payroll_tbl"
        >
          <thead>
            <tr>
              <th>JOB TITLE</th>
              <th>BASIC SALARY</th>
              <th>ALLOWANCE</th>
              <th>BONUS</th>
            </tr>
          </thead>
          <tbody>
            {salaryData.length > 0
              ? salaryData.map((value, index) => {
                  return (
                    <tr key={index}>
                      <td>{value.job_title}</td>
                      <td>{value.basic_salary}</td>
                      <td>{value.allowance}</td>
                      <td>{value.bonus}</td>
                    </tr>
                  );
                })
              : "Loading..."}
          </tbody>
        </table>
      </div>
    </section>
  );
}
