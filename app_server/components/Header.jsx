const React = require("react");

const Header = props => {
  logout = () => {
    props.logout();
  };

  deleteAllMessages = () => {
    props.deleteAllMessages();
  };

  let logoutButton;
  let deleteAllButton;
  props.logoutRender === false
    ? (logoutButton = (
        <button className="btn btn-secondary" onClick={logout}>
          Log Out
        </button>
      ))
    : null;

  props.userName === "Admin" && props.logoutRender === false
    ? (deleteAllButton = (
        <button className="btn btn-danger" onClick={deleteAllMessages}>
          Delete All Messages
        </button>
      ))
    : null;

  return (
    <React.Fragment>
      <h1>🐈 CAT TALK 🐈</h1>
      <h3>
        {props.loginMsg} {logoutButton} {deleteAllButton}
      </h3>
    </React.Fragment>
  );
};

module.exports = Header;
