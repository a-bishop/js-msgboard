const React = require("react");

const Header = props => {
  logout = () => {
    props.logout();
  };

  let logoutButton;
  props.logoutRender === false
    ? (logoutButton = (
        <button type="submit" className="btn btn-secondary" onClick={logout}>
          Log Out
        </button>
      ))
    : null;

  return (
    <React.Fragment>
      <h1>🐈 CAT TALK 🐈</h1>
      <h3>
        {props.loginMsg} {logoutButton}
      </h3>
    </React.Fragment>
  );
};

module.exports = Header;
