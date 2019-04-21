const React = require("react");

const Msg = props => {
  const [message, handleMsgChange] = React.useState(props.msg);
  const [doneEditing, isDoneEditing] = React.useState(true);

  const handleMessage = event => {
    event.preventDefault();
    const action = event.target.id;
    if (action === "edit") {
      handleMsgChange(props.msg), isDoneEditing(false);
    }
    const id = props.id;
    props.handleMsgCallback(
      id,
      action,
      props.userName,
      message,
      props.msgEmail
    );
  };

  const cancelButton = (
    <button
      id="cancel"
      className="btn btn-warning mr-3 mb-1"
      onClick={() => isDoneEditing(true)}
    >
      Cancel
    </button>
  );

  const editButton = (
    <button
      id="edit"
      className="btn btn-primary mr-3 mb-1"
      onClick={handleMessage}
    >
      Edit
    </button>
  );

  const deleteButton = (
    <button id="delete" className="btn btn-danger mb-1" onClick={handleMessage}>
      Delete
    </button>
  );

  const updateButton = (
    <button
      type="submit"
      id="update"
      className="btn btn-primary"
      onClick={handleMessage}
    >
      Update
    </button>
  );

  let editOrCancelButton = editButton;

  if (props.id === props.messageEditable && !doneEditing) {
    editOrCancelButton = cancelButton;
  }
  let userActions;
  if (props.isLoggedOut) {
    userActions = null;
  } else if (props.msgName === props.userName) {
    userActions = (
      <td className="col-3 col-lg-2">
        <div className="input-group">
          {editOrCancelButton}
          {deleteButton}
        </div>
      </td>
    );
  } else if (props.userName === "Admin" && props.msgName !== props.userName) {
    userActions = <td className="col-3 col-lg-2">{deleteButton}</td>;
  } else {
    userActions = <td className="col-3 col-lg-2" />;
  }

  let tableRow = (
    <tr className="d-flex">
      <td className="col-3">
        <img
          src={`https://avatars.dicebear.com/v2/identicon/${
            props.msgName
          }.svg?options[padding]=0.2&options[background]=%23042420`}
          width="50"
        />{" "}
        <span style={{ paddingLeft: "5px" }}> {props.msgName} </span>
      </td>
      <td className={props.isLoggedOut ? "col-9 col-lg-10" : "col-6 col-lg-7"}>
        {props.msg}
      </td>
      {userActions}
    </tr>
  );
  if (props.id === props.messageEditable && !doneEditing) {
    tableRow = (
      <tr className="d-flex">
        <td className="col-3">
          <img
            src={`https://avatars.dicebear.com/v2/identicon/${
              props.msgName
            }.svg?options[padding]=0.2&options[background]=%23042420`}
            width="50"
          />{" "}
          <span style={{ paddingLeft: "5px" }}> {props.msgName} </span>
        </td>
        <td className="col-6 col-lg-7">
          <form>
            <textarea
              id="message"
              type="text"
              className="form-control mr-3 mb-1"
              placeholder="Edit Message"
              value={message}
              onChange={() => handleMsgChange(event.target.value)}
            />
            {updateButton}
          </form>
        </td>
        {userActions}
      </tr>
    );
  }
  return <>{tableRow}</>;
};

module.exports = Msg;
