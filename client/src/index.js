import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./assets/css/common_styles.css";
import "./assets/css/index.css";
import Dashboard from "./assets/pages/dashboard";
import Employees from "./assets/pages/employees";
import Payroll from "./assets/pages/payroll";
import Loans from "./assets/pages/loans";
import Allowances from "./assets/pages/allowances";
import Contentarea from "./assets/components/contentarea";
import Tax from "./assets/pages/tax";
import LoginForm from "./assets/forms/login";
import Signup from "./assets/forms/signup";
import { ForgotPassword } from "./assets/forms/forgot_password";
import { ResetPassword } from "./assets/forms/reset_password";
import { EmployeeReg } from "./assets/forms/employee_registration";
import { EmployeePayForm } from "./assets/forms/employee_pay_form";
import { GeneratePayslip } from "./assets/forms/generate_payslip";
import { ApplyLoan } from "./assets/forms/loanapplication";
import SalaryStructue from "./assets/pages/salary_structure";

function Index() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<Contentarea />}>
          <Route path="/admin/account" element={<Dashboard />} />
          <Route path="/admin/employees" element={<Employees />} />
          <Route path="/admin/payroll" element={<Payroll />} />
          <Route path="/admin/loan" element={<Loans />} />
          <Route path="/admin/allowances" element={<Allowances />} />
          <Route path="/admin/tax" element={<Tax />} />
          <Route path="/admin/salary" element={<SalaryStructue />} />
          <Route path="/admin/registeremployee" element={<EmployeeReg />} />
          <Route path="/admin/payemployee" element={<EmployeePayForm />} />
          <Route path="/admin/payslip" element={<GeneratePayslip />} />
          <Route path="/admin/applyloan" element={<ApplyLoan />} />
          <Route path="/admin/resetpassword" element={<ResetPassword />} />
          <Route path="/admin/generatepayslip" element={<GeneratePayslip />} />
        </Route>
      </Routes>
      {/* </Contentarea> */}
      <Routes>
        <Route path="/" element={<LoginForm />}></Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<Index />);
