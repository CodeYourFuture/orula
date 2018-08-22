import React from "react";
import { loginUser } from "../../helpers/api";
import { Link } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      message: ""
    };
  }

  onHandleChange = (input, e) => {
    const value = e.target.value;
    this.setState({ [input]: value });
  };

  // post it to /auth/login endpoint
  onSubmit = async e => {
    e.preventDefault();
    const { email, password } = this.state;
    try {
      await loginUser(email, password); // if this is successful go to next line
      this.setState({
        message: "Successfully logged in!"
      });
      this.props.history.push("/"); // go to home page
    } catch (err) {
      if (err.response.status === 400) {
        this.setState({
          message: "Login failed. Username or password not match"
        });
      }
    }
  };

  render() {
    const { email, password, message } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-md-offset-4">
            <div className="login-panel panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Please Sign In</h3>
              </div>
              <div className="panel-body">
                <form>
                  <fieldset>
                    <div className="form-group">
                      <input
                        onChange={e => this.onHandleChange("email", e)}
                        className="form-control"
                        placeholder="E-mail"
                        name="email"
                        type="email"
                        value={email}
                        autoFocus
                      />
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control"
                        placeholder="Password"
                        name="password"
                        type="password"
                        onChange={e => this.onHandleChange("password", e)}
                        value={password}
                      />
                    </div>
                    <button
                      className="btn btn-lg btn-success btn-block"
                      onClick={this.onSubmit}
                    >
                      Login
                    </button>
                  </fieldset>
                  <br />
                  <p>
                    Not a member? <Link to="/register">Register here</Link>
                  </p>
                </form>
              </div>
            </div>
            {message !== "" && (
              <div
                className="alert alert-warning alert-dismissible"
                role="alert"
              >
                {message}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
