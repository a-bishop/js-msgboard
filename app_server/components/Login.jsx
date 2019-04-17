const React = require("react");

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.login = this.login.bind(this);
    this.handleText = this.handleText.bind(this);
    this.register = this.register.bind(this);
  }

  login(event) {
    event.preventDefault();
    // pass control to MsgBoard and send
    // the email and pass the user entered
    if (this.props.loginAttempts > 0) {
      this.props.loginCallback({
        email: this.state.email,
        password: this.state.password
      });
    }
  }

  handleText(event) {
    event.preventDefault();
    const id = event.target.id;
    const val = event.target.value;
    if (id === "email") {
      this.setState({
        email: val
      });
    } else if (id === "password") {
      this.setState({
        password: val
      });
    }
  }

  register(event) {
    event.preventDefault();

    this.props.registerCallback({
      email: this.state.email,
      password: this.state.password
    });
  }

  render() {
    let loginFailText = "";

    if (this.props.loginFail) {
      loginFailText = (
        <p className="card-text pt-1 text-danger">
          Failed Login Attempt. &nbsp;{this.props.loginAttempts} attempts
          remaining.{" "}
        </p>
      );
    }

    if (this.props.loginAttempts === 0) {
      loginFailText = (
        <p className="card-text pt-1 text-danger">
          Too many failed login attempts. You have been locked out of the
          application.
        </p>
      );
    }

    return (
      <div className="card" style={{ maxWidth: "65rem" }}>
        <div className="card-body" style={{ maxWidth: "60rem" }}>
          <form className="pb-2" onSubmit={this.login}>
            <h4 className="card-title pb-2">Log in to post a message:</h4>
            <div className="row">
              <div className="col-md-5">
                <div className="row pb-2 pr-2" style={{ minWidth: "15rem" }}>
                  <h5 className="col card-title" style={{ minWidth: "7.5rem" }}>
                    Email:
                  </h5>
                  <input
                    type="email"
                    name="email"
                    className="form-control col"
                    id="email"
                    placeholder="enter email"
                    onChange={this.handleText}
                  />
                </div>
              </div>

              <div className="col-md-5">
                <div className="row pb-2 pr-2" style={{ minWidth: "15rem" }}>
                  <h5 className="col card-title" style={{ minWidth: "7.5rem" }}>
                    Password:
                  </h5>
                  <input
                    type="password"
                    name="password"
                    className="form-control col"
                    id="password"
                    placeholder="enter password"
                    onChange={this.handleText}
                  />
                </div>
              </div>

              <div className="col-md-2">
                <input
                  type="submit"
                  value="Log In"
                  className="btn btn-primary"
                />
              </div>
            </div>
          </form>
          {loginFailText}
          <div className="row" style={{ maxWidth: "18rem" }}>
            <h5 className="col-md-8">Not registered?</h5>
            <div className="col-md-4">
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={this.register}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Login;
