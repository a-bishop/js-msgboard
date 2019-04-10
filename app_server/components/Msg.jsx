const React = require("react");

class Msg extends React.Component {
  constructor(props) {
    super(props);
    this.handleMessage = this.handleMessage.bind(this);
    this.state = {
      message: this.props.msg,
      doneEditing: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
    this.cancelEditing = this.cancelEditing.bind(this);
  }

  handleMessage(event) {
    event.preventDefault();
    if (event.target.id === "edit") {
      this.setState({
        message: this.props.msg,
        doneEditing: false
      });
    }
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
    const cancelButton = (
      <button
        id="cancel"
        className="btn btn-warning mr-3 mb-1"
        onClick={this.cancelEditing}
      >
        Cancel
      </button>
    );
    const editButton = (
      <button
        id="edit"
        className="btn btn-primary mr-3 mb-1"
        onClick={this.handleMessage}
      >
        Edit
      </button>
    );
    const deleteButton = (
      <button
        id="delete"
        className="btn btn-danger mb-1"
        onClick={this.handleMessage}
      >
        Delete
      </button>
    );
    const updateButton = (
      <button
        type="submit"
        id="update"
        className="btn btn-primary"
        onClick={this.handleMessage}
      >
        Update
      </button>
    );
    let editOrCancelButton = editButton;
    if (
      this.props.id === this.props.messageEditable &&
      !this.state.doneEditing
    ) {
      editOrCancelButton = cancelButton;
    }
    let userActions;
    if (this.props.isLoggedOut) {
      userActions = null;
    } else if (this.props.msgName === this.props.userName) {
      userActions = (
        <td className="col-3 col-lg-2">
          <div className="input-group">
            {editOrCancelButton}
            {deleteButton}
          </div>
        </td>
      );
    } else if (
      this.props.userName === "Admin" &&
      this.props.msgName !== this.props.userName
    ) {
      userActions = <td className="col-3 col-lg-2">{deleteButton}</td>;
    } else {
      userActions = <td className="col-3 col-lg-2" />;
    }
    let tableRow = (
      <tr className="d-flex">
        <td className="col-3">{this.props.msgName}</td>
        <td
          className={
            this.props.isLoggedOut ? "col-9 col-lg-10" : "col-6 col-lg-7"
          }
        >
          {this.props.msg}
        </td>
        {userActions}
      </tr>
    );
    if (
      this.props.id === this.props.messageEditable &&
      !this.state.doneEditing
    ) {
      tableRow = (
        <tr className="d-flex">
          <td className="col-3">{this.props.msgName}</td>
          <td className="col-6 col-lg-7">
            <form>
              <textarea
                id="message"
                type="text"
                className="form-control mr-3 mb-1"
                placeholder="Edit Message"
                value={this.state.message}
                onChange={this.handleChange}
              />
              {updateButton}
            </form>
          </td>
          {userActions}
        </tr>
      );
    }
    return <>{tableRow}</>;
  }
}

module.exports = Msg;
