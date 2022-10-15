import { useEffect, useState } from "react";
import "../css/common_styles.css";
import "../css/index.css";
const axios = require("axios").default;
export default function Profilebar() {
  // const [profileEmail, setProfileEmail] = useState("");

  useEffect(() => {
    const handleCurrentUserEmail = () => {
      axios
        .get("http://localhost:3001/api/v1/users/")
        .then((response) => {
          if (response.status === 200) {
            // let currentUserEmail = response.data.users.filter((item) => {
            //   return item.email === localStorage.getItem("email");
            // });
            // setProfileEmail(currentUserEmail);
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
      <div className="ip-status-grid-container">
        <div>
          <h3>Welcome Enoch!</h3>
        </div>
        <div>
          <p>enochboison@gmail.com</p>
        </div>
        <div>
          <img src={require("../img/icons/user.svg").default} alt="" />
        </div>
      </div>
    </header>
  );
}
