import React, { useEffect, useState } from "react";
import "../css/common_styles.css";
import { NavLink } from "react-router-dom";
import "../css/payroll.css";

import moment from "moment-timezone/builds/moment-timezone-with-data-2012-2022";

const axios = require("axios").default;

export default function Payroll() {
  const [payrollData, setPayrollData] = useState([]);

  useEffect(() => {
    const handlePayrollData = async () => {
      axios
        .get("http://localhost:3001/api/v1/payroll")
        .then((response) => {
          if (response.status === 200) {
            setPayrollData(response.data.payroll);
            // console.log(response.data.payroll);
          }
        })
        .catch((error) => {
          throw new Error(error);
        });
    };
    handlePayrollData();
  }, []);

  return (
    <section className="payroll_detail_section">
      <p className="uk-margin-top uk-margin-left">
        <NavLink to="/admin/payemployee">
          <button className="uk-button uk-button-danger">Add to payroll</button>
        </NavLink>
      </p>
      <div className="payroll_container">
        <table
          class="uk-table uk-table-large uk-table-striped uk-table-middle"
          id="payroll_tbl"
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>NAME</th>
              <th>JOB TITLE</th>
              <th>BASIC WAGE</th>
              <th>BONUS</th>
              <th>ALLOWANCE</th>
              <th>INCOME TAX</th>
              <th>BONUS TAX</th>
              <th>TIER 1</th>
              <th>TIER 2</th>
              <th>LOAN DEDUCTION</th>
              <th>TOTAL DEDUCTION</th>
              <th>NET SALARY</th>
            </tr>
          </thead>
          <tbody>
            {payrollData.length > 0
              ? payrollData.map((value, index) => {
                  return (
                    <tr key={index}>
                      <th>{value.id}</th>
                      <th> {moment(value.date).format("MMMM, YYYY")}</th>
                      <th>{value.name}</th>
                      <th>{value.job_title}</th>
                      <th>{value.basic_wage}</th>
                      <th>{value.bonus}</th>
                      <th>{value.allowance}</th>
                      <th>{value.income_tax}</th>
                      <th>{value.bonus_tax}</th>
                      <th>{value.teir_one}</th>
                      <th>{value.teir_two}</th>
                      <th>{value.loan_deduction}</th>
                      <th>{value.total_deduction}</th>
                      <th>{value.net_salary}</th>
                    </tr>
                  );
                })
              : "loading"}
          </tbody>
        </table>
      </div>
    </section>
  );
}
