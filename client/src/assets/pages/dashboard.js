import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../css/common_styles.css";
import "../css/index.css";

const axios = require("axios").default;

export default function Dashboard() {
  const navigate = useNavigate();
  const [noOfUsers, setNoOfUsers] = useState(0);
  const [userLoggedIn, setUserLoggedIn] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      const handle_employeeData = async () => {
        axios
          .get("http://localhost:3001/api/v1/users/")
          .then((response) => {
            if (response.status === 200) {
              setNoOfUsers(response.data.users.length);

              let currentUser = response.data.users.filter((item) => {
                return item.email === localStorage.getItem("email");
              });
              setUserLoggedIn(currentUser);
            }
          })
          .catch((error) => {
            throw new Error(error);
          });
      };
      handle_employeeData();
    }, 1000);
  });

  const handleLogout = () => {
    localStorage.removeItem("session_token");
  };

  const setLogoutFeature = () => {
    if (localStorage.getItem("session_token") === null) {
      let confirmMessage = window.confirm("Are you sure you want to exit?");
      if (confirmMessage === true) {
        navigate("/");
        localStorage.clear();
      } else {
        localStorage.setItem("session_token", true);
      }
    }
  };
  setLogoutFeature();

  return (
    <main className="grid-container">
      {userLoggedIn.map((user) => {
        return (
          <div className="ip-flex-container">
            <div title="Shows the number of admin accounts registered">
              <img
                src={require("../img/icons/gear.svg").default}
                className="account-card-icon"
                alt=""
              />
              <h5 className="account-card-title">ACCOUNTS</h5>
              <h5 className="account-card-figure">{noOfUsers}</h5>
            </div>
            <div title="Shows the current account logged in">
              <img
                src={require("../img/icons/user.svg").default}
                className="account-card-icon"
                alt=""
              />
              <h5 className="account-card-title">
                USERNAME <br />
                {user.name}
              </h5>
            </div>

            <div title="Click here to change your account password">
              <Link to="/admin/resetpassword">
                <img
                  src={require("../img/icons/reset.svg").default}
                  className="account-card-icon"
                  alt=""
                />
                <h5 className="account-card-title">
                  RESET <br /> PASSWORD
                </h5>
              </Link>
            </div>

            <div title="Click here to exit your account session">
              <NavLink onClick={handleLogout}>
                <img
                  src={require("../img/icons/logout.svg").default}
                  className="account-card-icon"
                  alt=""
                />
                <h5 className="account-card-title">LOGOUT</h5>
              </NavLink>
            </div>
          </div>
        );
      })}
    </main>
  );
}
