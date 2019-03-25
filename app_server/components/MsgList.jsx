const React = require("react");
const Msg = require("./Msg.jsx");

class MsgList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: this.props.messages
    };

    this.handleMessage = this.handleMessage.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ messages: nextProps.messages });
  }

  handleMessage(id, action, name, message, email) {
    this.props.handleMsgCallback(id, action, name, message, email);
  }

  render() {
    let body = <tbody />;
    if (this.state.messages.length > 0) {
      body = (
        <tbody>
          {this.state.messages.map((message, index) => (
            <Msg
              key={index}
              displayId={index + 1}
              id={message._id}
              msgName={message.name}
              userName={this.props.userName}
              msgEmail={message.email}
              msg={message.msg}
              handleMsgCallback={this.handleMessage}
              messageEditable={this.props.messageEditable}
            />
          ))}
        </tbody>
      );
    }

    return (
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col" className="col-1">
              #
            </th>
            <th scope="col" className="col-2">
              Name
            </th>
            <th scope="col" className="col-7">
              Message
            </th>
            <th scope="col" className="col-2">
              Action
            </th>
          </tr>
        </thead>
        {body}
      </table>
    );
  }
}

module.exports = MsgList;
