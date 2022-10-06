import "../css/common_styles.css";
import "../css/index.css";
import "../css/dashboard.css";
import "../css/employees.css";
import "../css/payroll.css";

import Navbar from "./navbar";
import Profilebar from "./profilebar";
import { Outlet } from "react-router-dom";

export default function Contentarea() {
  return (
    <main className="grid-container">
      <Navbar />
      <section role="presentation" class="content-section">
        <Profilebar />
        <div className="dashboard">
          <Outlet />
        </div>
      </section>
    </main>
  );
}
