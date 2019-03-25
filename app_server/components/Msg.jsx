const React = require("react");

class Msg extends React.Component {
  constructor(props) {
    super(props);
    this.handleMessage = this.handleMessage.bind(this);
    this.state = {
      message: this.props.msg,
      doneEditing: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
  }

  handleMessage(event) {
    event.preventDefault();
    this.setState({
      doneEditing: false
    });
    let id = this.props.id;
    let action = event.target.id;
    this.props.handleMsgCallback(
      id,
      action,
      this.props.userName,
      this.state.message,
      this.props.msgEmail
    );
  }

  handleChange(event) {
    this.setState({
      message: event.target.value
    });
  }

  cancelEdit() {
    this.setState({
      doneEditing: true
    });
  }

  render() {
    console.log("msg state", this.state);
    console.log("msg props", this.props);
    let userActions;
    let editOrCancelButton = (
      <button
        id="edit"
        className="btn btn-primary mr-3 mb-1"
        onClick={this.handleMessage}
      >
        Edit
      </button>
    );
    if (
      this.props.id === this.props.messageEditable &&
      !this.state.doneEditing
    ) {
      editOrCancelButton = (
        <button
          id="cancel"
          className="btn btn-warning mr-3 mb-1"
          onClick={this.cancelEdit}
        >
          Cancel
        </button>
      );
    }
    if (this.props.userName === "Admin") {
      if (this.props.msgName === this.props.userName) {
        userActions = (
          <td>
            <div className="input-group">
              {editOrCancelButton}
              <button
                id="delete"
                className="btn btn-danger mb-1"
                onClick={this.handleMessage}
              >
                Delete
              </button>
            </div>
          </td>
        );
      } else {
        userActions = (
          <td>
            <button
              id="delete"
              className="btn btn-danger mb-1"
              onClick={this.handleMessage}
            >
              Delete
            </button>
          </td>
        );
      }
    } else if (
      this.props.msgName === this.props.userName &&
      this.props.userName !== "Admin"
    ) {
      userActions = (
        <td>
          <div className="input-group">
            {editOrCancelButton}
            <button
              id="delete"
              className="btn btn-danger mb-1"
              onClick={this.handleMessage}
            >
              Delete
            </button>
          </div>
        </td>
      );
    } else {
      userActions = <td />;
    }
    let table = (
      <tr className="align-items-center">
        <td>{this.props.displayId}</td>
        <td>{this.props.msgName}</td>
        <td>{this.props.msg}</td>
        {userActions}
      </tr>
    );
    if (
      this.props.id === this.props.messageEditable &&
      !this.state.doneEditing
    ) {
      table = (
        <tr className="align-items-center">
          <td>{this.props.displayId}</td>
          <td>{this.props.msgName}</td>
          <td>
            <form>
              <div className="input-group">
                <input
                  id="message"
                  type="text"
                  className="form-control mr-3 mb-1"
                  placeholder="Edit Message"
                  value={this.state.message}
                  onChange={this.handleChange}
                />
                <button
                  type="submit"
                  id="update"
                  className="btn btn-primary"
                  onClick={this.handleMessage}
                >
                  Update
                </button>
              </div>
            </form>
          </td>
          {userActions}
        </tr>
      );
    }
    return <>{table}</>;
  }
}

module.exports = Msg;
