import React from "react";
import "../css/common_styles.css";
import "../css/index.css";

export default function Dashboard() {
  return (
    <main className="grid-container">
      <div className="ip-flex-container">
        <div title="Shows the number of admin accounts registered">
          <img
            src={require("../img/icons/gear.svg").default}
            className="account-card-icon"
            alt=""
          />
          <h5 className="account-card-title">ACCOUNTS</h5>
          <h5 className="account-card-figure">5</h5>
        </div>
        <div title="Shows the current account logged in">
          <img
            src={require("../img/icons/user.svg").default}
            className="account-card-icon"
            alt=""
          />
          <h5 className="account-card-title">
            USERNAME <br /> DevBoison
          </h5>
          {/* <h5 class="account-card-title">DevBoison</h5> */}
        </div>
        <div title="Click here to change your account password">
          <img
            src={require("../img/icons/reset.svg").default}
            className="account-card-icon"
            alt=""
          />
          <h5 className="account-card-title">
            RESET <br /> PASSWORD
          </h5>
          {/* <h5 class="account-card-figure">5</h5>  */}
        </div>
        <div title="Click here to exit your account session">
          <img
            src={require("../img/icons/logout.svg").default}
            className="account-card-icon"
            alt=""
          />
          <h5 className="account-card-title">LOGOUT</h5>
        </div>
      </div>
    </main>
  );
}
