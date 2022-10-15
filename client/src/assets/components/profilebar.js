import { useEffect, useState } from "react";
import "../css/common_styles.css";
import "../css/index.css";
const axios = require("axios").default;
export default function Profilebar() {
  const [profileEmail, setProfileEmail] = useState([]);

  useEffect(() => {
    const handleCurrentUserEmail = () => {
      axios
        .get("http://localhost:5000/api/v1/users/")
        .then((response) => {
          if (response.status === 200) {
            let currentUserEmail = response.data.users.filter((item) => {
              return item.email === localStorage.getItem("email");
            });
            setProfileEmail(currentUserEmail);
            // console.log(profileEmail);
          }
        })
        .catch((error) => {
          throw new Error(error);
        });
    };
    handleCurrentUserEmail();
  });

  return (
    <header className="welcome-status-bar">
      {profileEmail.map((user) => {
        return (
          <div className="ip-status-grid-container">
            <div>
              <h3 className="profile-name">
                Welcome {user.name ? user.name : "Anonymous user"}!
              </h3>
            </div>
            <div>
              <p className="profile-email">
                {user.email ? user.email : "unknown"}
              </p>
            </div>
            <div>
              <img src={require("../img/icons/user.svg").default} alt="" />
            </div>
          </div>
        );
      })}
    </header>
  );
}
