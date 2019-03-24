const React = require("react");

class Msg extends React.Component {
  constructor(props) {
    super(props);
    this.handleMessage = this.handleMessage.bind(this);
  }

  handleMessage(event) {
    let id = this.props.id;
    let action = event.target.id;
    this.props.handleMsgCallback(id, action);
  }

  render() {
    let userActions;
    if (
      this.props.userEmail === "admin@test.com" ||
      this.props.userEmail === this.props.messageCreator
    ) {
      userActions = (
        <td>
          <button
            id="edit"
            className="btn btn-primary mr-3"
            onClick={this.handleMessage}
          >
            Edit
          </button>
          <button
            id="delete"
            className="btn btn-danger"
            onClick={this.handleMessage}
          >
            Delete
          </button>
        </td>
      );
    } else {
      userActions = <td />;
    }
    return (
      <tr>
        <td>{this.props.displayId}</td>
        <td>{this.props.name}</td>
        <td>{this.props.msg}</td>
        {userActions}
      </tr>
    );
  }
}

module.exports = Msg;
