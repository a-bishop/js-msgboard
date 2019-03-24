const React = require("react");

class Msg extends React.Component {
  constructor(props) {
    super(props);
    this.handleMessage = this.handleMessage.bind(this);
    this.state = {
      message: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
  }

  handleMessage(event) {
    let id = this.props.id;
    let action = event.target.id;
    this.props.handleMsgCallback(
      id,
      action,
      this.props.name,
      this.state.message,
      this.props.userEmail
    );
  }

  handleChange(event) {
    this.setState({
      message: event.target.value
    });
  }

  render() {
    console.log(this.props);
    let userActions;
    let editOrUpdateButton = (
      <button
        id="edit"
        className="btn btn-primary mr-3"
        onClick={this.handleMessage}
      >
        Edit
      </button>
    );
    if (this.props.id === this.props.messageEditable) {
      editOrUpdateButton = (
        <button
          id="update"
          className="btn btn-primary mr-3"
          onClick={this.handleMessage}
        >
          Update
        </button>
      );
    }
    if (
      this.props.userEmail === "admin@test.com" ||
      this.props.userEmail === this.props.messageCreator
    ) {
      userActions = (
        <td>
          {editOrUpdateButton}
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
    let table = (
      <tr>
        <td>{this.props.displayId}</td>
        <td>{this.props.name}</td>
        <td>{this.props.msg}</td>
        {userActions}
      </tr>
    );
    if (this.props.id === this.props.messageEditable) {
      table = (
        <tr>
          <td>{this.props.displayId}</td>
          <td>{this.props.name}</td>
          <td>
            <input
              id="message"
              type="text"
              className="form-control"
              placeholder="Edit Message"
              value={this.state.message}
              onChange={this.handleChange}
            />
          </td>
          {userActions}
        </tr>
      );
    }
    return <>{table}</>;
  }
}

module.exports = Msg;
