const React = require("react");
const Header = require("./Header.jsx");
const MsgList = require("./MsgList.jsx");
const NewMsg = require("./NewMsg.jsx");
const Login = require("./Login.jsx");
const Registration = require("../../client_side/Registration.jsx");

class MsgBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: this.props.messages,
      loginForm: true,
      loginAttempts: 3,
      loginFail: false,
      loading: true,
      loginMsg: "",
      userCredentials: {
        email: "",
        password: ""
      },
      registrationForm: false,
      registrationFail: false,
      messageEditable: 0
    };

    this.addMessage = this.addMessage.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.addNewUser = this.addNewUser.bind(this);
    this.logout = this.logout.bind(this);
  }

  handleHTTPErrors(response) {
    if (!response.ok) throw Error(response.status + ": " + response.statusText);
    return response;
  }

  componentDidMount() {
    this.hydrateStateWithSessionStorage();
    window.addEventListener(
      "beforeunload",
      this.saveStateToSessionStorage.bind(this)
    );
    fetch(`${process.env.API_URL}/msgs`)
      .then(response => this.handleHTTPErrors(response))
      .then(response => response.json())
      .then(result => {
        this.setState({
          messages: result,
          loading: false
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentWillUnmount() {
    window.removeEventListener(
      "beforeunload",
      this.saveStateToSessionStorage.bind(this)
    );

    // saves if component has a chance to unmount
    this.saveStateToSessionStorage();
  }

  saveStateToSessionStorage() {
    // for every item in React state
    for (let key in this.state) {
      // save to sessionStorage except sensitive credentials and the messages
      if (key !== "messages" && key !== "loading" && key !== "messageEditable")
        sessionStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }

  hydrateStateWithSessionStorage() {
    // for all items in state
    for (let key in this.state) {
      // if the key exists in sessionStorage
      if (sessionStorage.hasOwnProperty(key)) {
        // get the key's value from sessionStorage
        let value = sessionStorage.getItem(key);

        // parse the sessionStorage string and setState
        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          // handle empty string
          this.setState({ [key]: value });
        }
      }
    }
  }

  login(userCredentials) {
    // userCredentials is passed in from Login Component
    // For Basic Authentication it is username:password (but we're using email)
    const basicString = userCredentials.email + ":" + userCredentials.password;
    fetch(`${process.env.API_URL}/users/login`, {
      method: "POST",
      headers: {
        Authorization: "Basic " + btoa(basicString),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: userCredentials.email })
    })
      .then(response => this.handleHTTPErrors(response))
      .then(result => result.json())
      .then(result => {
        this.setState({
          userCredentials: userCredentials,
          loginForm: false,
          loginFail: false,
          loginMsg: `Hello, ${result.username}`
        });
      })
      .catch(error => {
        this.setState(state => {
          return {
            loginFail: true,
            loginAttempts: state.loginAttempts - 1
          };
        });
        console.log(error);
      });
  }

  logout() {
    this.setState({
      loginForm: true,
      loginAttempts: 3,
      loginFail: false,
      loginMsg: "",
      userCredentials: {
        email: "",
        password: ""
      },
      registrationForm: false,
      registrationFail: false
    });
  }

  register() {
    this.setState({
      registrationForm: true
    });
  }

  addNewUser(userDetails) {
    fetch(`${process.env.API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userDetails)
    })
      .then(response => {
        if (response.status === 201) {
          // User successfully registered
          // disable the Registration Form
          this.setState(
            {
              registrationForm: false,
              registrationFail: false
            },
            () =>
              this.login({
                email: userDetails.email,
                password: userDetails.password
              })
          );
        } else {
          // Some Error or User already exists
          this.setState({
            registrationFail: true
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleMessage(id, action, name, message, email) {
    console.log(id, action, name, message);
    if (action === "delete") {
      let idObj = { _id: id };
      fetch(`${process.env.API_URL}/msgs/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(idObj)
      })
        .then(response => this.handleHTTPErrors(response))
        .then(result => result.json())
        .then(result => {
          let newMsgs = this.state.messages;
          newMsgs = newMsgs.filter(msg => msg._id !== result.id);
          this.setState({
            messages: newMsgs
          });
        })
        .catch(error => {
          console.log(error);
        });
    } else if (action === "edit") {
      fetch(`${process.env.API_URL}/msgs/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => this.handleHTTPErrors(response))
        .then(result => result.json())
        .then(result => {
          this.setState({
            messageEditable: result._id
          });
        })
        .catch(error => {
          console.log(error);
        });
    } else if (action === "update") {
      let body = JSON.stringify({ name: name, msg: message });
      fetch(`${process.env.API_URL}/msgs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: body
      })
        .then(response => this.handleHTTPErrors(response))
        .then(result => result.json())
        .then(result => {
          let newMsgs = this.state.messages;
          let msgIndex = newMsgs.findIndex(
            message => result.id === message._id
          );
          newMsgs.splice(msgIndex, 1, {
            _id: id,
            email: email,
            msg: message,
            name: name
          });
          console.log(msgIndex);
          this.setState({
            messages: newMsgs,
            messageEditable: 0
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  addMessage(message) {
    message.email = this.state.userCredentials.email;
    const basicString =
      this.state.userCredentials.email +
      ":" +
      this.state.userCredentials.password;
    fetch(`${process.env.API_URL}/msgs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(basicString)
      },
      body: JSON.stringify(message)
    })
      .then(response => this.handleHTTPErrors(response))
      .then(result => result.json())
      .then(result => {
        console.log([result]);
        let newMsgs = [result].concat(this.state.messages);
        this.setState({
          messages: newMsgs
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    let form = "";

    if (this.state.registrationForm) {
      let failedRegistration;

      if (this.state.registrationFail) {
        failedRegistration = (
          <p className="text-danger">
            User already Registered or Registration Error.
          </p>
        );
      }
      return (
        <div>
          <Registration registerNewUserCallback={this.addNewUser} />
          {failedRegistration}
        </div>
      );
    } else {
      if (this.state.loginForm) {
        form = (
          <Login
            registerCallback={this.register}
            loginCallback={this.login}
            loginFail={this.state.loginFail}
            loginAttempts={this.state.loginAttempts}
          />
        );
      } else {
        form = <NewMsg addMsgCallback={this.addMessage} />;
      }
      if (!this.state.loading) {
        return (
          <React.Fragment>
            <Header
              loginMsg={this.state.loginMsg}
              logout={this.logout}
              logoutRender={this.state.loginForm}
            />
            {form}
            <MsgList
              email={this.state.userCredentials.email}
              messages={this.state.messages}
              handleMsgCallback={this.handleMessage}
              messageEditable={this.state.messageEditable}
            />
          </React.Fragment>
        );
      } else {
        return null;
      }
    }
  }
}

module.exports = MsgBoard;
