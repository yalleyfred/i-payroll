import React, { useEffect, useState } from "react";
import "../css/common_styles.css";
// import "../css/index.css";
import "../css/payroll.css";

import moment from "moment-timezone/builds/moment-timezone-with-data-2012-2022";
import { Link } from "react-router-dom";
const axios = require("axios").default;

export default function Loans() {
  const [loanData, setLoanData] = useState([]);

  useEffect(() => {
    const handleLoanData = async () => {
      axios
        .get("http://localhost:3001/api/v1/loan")
        .then((response) => {
          if (response.status === 200) {
            setLoanData(response.data.result);
            console.log(response.data.result);
          }
        })
        .catch((error) => {
          throw new Error(error);
        });
    };
    handleLoanData();
  }, []);

  return (
    <section className="payroll_detail_section">
      <Link to="/admin/applyloan">
        <p className="uk-margin-top uk-margin-left">
          <button className="uk-button uk-button-danger">Apply Loan</button>
        </p>
      </Link>

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
              <th>AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            {loanData.length > 0
              ? loanData.map((value, index) => {
                  return (
                    <tr key={index}>
                      <td>{value.id}</td>
                      <td> {moment(value.date).format("MMMM, YYYY")}</td>
                      <td>{value.name}</td>
                      <td>{value.amount}</td>
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
