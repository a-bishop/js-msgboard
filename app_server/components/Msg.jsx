const React = require("react");

class Msg extends React.Component {
  constructor(props) {
    super(props);
    this.deleteMessage = this.deleteMessage.bind(this);
  }

  deleteMessage() {
    console.log(this.props);
    let id = this.props.id;
    this.props.deleteMsgCallback(id);
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
            type="submit"
            className="btn btn-danger"
            onClick={this.deleteMessage}
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
