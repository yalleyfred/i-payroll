import "../css/common_styles.css";
import "../css/index.css";

export default function Profilebar() {
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
