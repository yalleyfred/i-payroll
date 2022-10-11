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

function Index() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Contentarea />}>
          <Route path="/account" element={<Dashboard />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/payroll" element={<Payroll />} />
          <Route path="/loan" element={<Loans />} />
          <Route path="/allowances" element={<Allowances />} />
          <Route path="/tax" element={<Tax />} />
        </Route>
      </Routes>
      {/* </Contentarea> */}
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        {/* <Route path="/resetpassword/:token" element={<ResetPassword />} /> */}
        <Route path="/registeremployee" element={<EmployeeReg />} />
      </Routes>
    </Router>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<Index />);
