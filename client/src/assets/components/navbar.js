import * as React from "react";
import { Link } from "react-router-dom";
import "../css/common_styles.css";
import "../css/index.css";

export default function Navbar() {
  return (
    <section role="menu" className="side-nav">
      <header>
        <h1 className="logo-heading-text">iPayroll</h1>
      </header>
      <nav>
        <ul role="group" className="nav-menu-item-list">
          <li role="presentation">
            <img
              src={require("../img/icons/home.svg").default}
              alt="account menu icon"
              className="nav-menu-icon"
            />
            <Link to="/account" role="menuitem">
              Account
            </Link>
          </li>
          <li role="presentation">
            <img
              src={require("../img/icons/employees.svg").default}
              alt="employee menu icon"
              className="nav-menu-icon"
            />
            <Link to="/employees" role="menuitem">
              Employees
            </Link>
          </li>
          <li role="presentation">
            <img
              src={require("../img/icons/payroll.svg").default}
              alt="payroll menu-icon"
              className="nav-menu-icon"
            />
            <Link to="/payroll" role="menuitem">
              Payroll
            </Link>
          </li>
          <li role="presentation">
            <img
              src={require("../img/icons/tax.svg").default}
              alt="tax menu icon"
              className="nav-menu-icon"
            />
            <Link to="/tax" role="menuitem">
              Tax
            </Link>
          </li>
          <li role="presentation">
            <img
              src={require("../img/icons/loan.svg").default}
              alt="loan menu icon"
              className="nav-menu-icon"
            />
            <Link to="/loan" role="menuitem">
              Loan
            </Link>
          </li>
          <li role="presentation">
            <img
              src={require("../img/icons/allowances.svg").default}
              alt="allowances menu icon"
              className="nav-menu-icon"
            />
            <Link to="/allowances" role="menuitem">
              Allowances
            </Link>
          </li>
          <li role="presentation">
            <img
              src={require("../img/icons/reports.svg").default}
              alt="report menu-icon"
              className="nav-menu-icon"
            />
            <Link to="/report" role="menuitem">
              Report
            </Link>
          </li>
        </ul>
      </nav>
      <p>&nbsp;</p>
      <p>&nbsp;</p>
      <p>&nbsp;</p>
      <p className="contact-support" title="Click here to report an issue">
        {/* <Link to="/support"> */}
        Contact Support
        {/* </Link> */}
      </p>
    </section>
  );
}
