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
    </Router>
  );
}

const root = createRoot(document.getElementById("root")!);
root.render(<Index />);
