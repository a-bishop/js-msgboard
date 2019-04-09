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
    this.cancelEditing = this.cancelEditing.bind(this);
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

  cancelEditing() {
    this.setState({
      doneEditing: true
    });
  }

  render() {
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
          onClick={this.cancelEditing}
        >
          Cancel
        </button>
      );
    }
    if (this.props.userName === "Admin") {
      if (this.props.msgName === this.props.userName) {
        userActions = (
          <td className="col-3">
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
          <td className="col-3">
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
        <td className="col-3">
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
    } else if (this.props.isLoggedOut) {
      userActions = null;
    } else {
      userActions = <td className="col-3" />;
    }
    let table = (
      <tr className="d-flex">
        <td className="col-3">{this.props.msgName}</td>
        <td className={this.props.isLoggedOut ? "col-9" : "col-6"}>
          {this.props.msg}
        </td>
        {userActions}
      </tr>
    );
    if (
      this.props.id === this.props.messageEditable &&
      !this.state.doneEditing
    ) {
      table = (
        <tr className="d-flex">
          <td className="col-3">{this.props.msgName}</td>
          <td className="col-6">
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
