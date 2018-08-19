import React from "react";
import { loginUser } from "../../helpers/api";
import MyProfile from "../MyProfile/MyProfile";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      message: "",
      loggedIn: false
    };
  }

  onHandleChange = (input, e) => {
    const value = e.target.value;
    this.setState({ [input]: value });
  };

  // post it to /auth/login
  onSubmit = async e => {
    e.preventDefault();
    const { email, password } = this.state;
    try {
      const { data } = await loginUser(email, password);
      console.log(data);
      this.setState({
        loggedIn: true,
        message: "Successfully logged in!"
      });
    } catch (err) {
      this.setState({ message: err });
    }
  };

  render() {
    if (this.state.loggedIn) return <MyProfile />;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-md-offset-4">
            <div className="login-panel panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Please Sign In</h3>
              </div>
              <div className="panel-body">
                <form role="form">
                  <fieldset>
                    <div className="form-group">
                      <input
                        onChange={e => this.onHandleChange("email", e)}
                        className="form-control"
                        placeholder="E-mail"
                        name="email"
                        type="email"
                        value={this.state.email}
                        autofocus
                      />
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control"
                        placeholder="Password"
                        name="password"
                        type="password"
                        onChange={e => this.onHandleChange("password", e)}
                        value={this.state.password}
                      />
                    </div>
                    <div className="checkbox">
                      <label>
                        <input
                          name="remember"
                          type="checkbox"
                          value="Remember Me"
                        />
                        Remember me
                      </label>
                    </div>
                    <button
                      onClick={e => this.onSubmit(e)}
                      className="btn btn-lg btn-success btn-block"
                    >
                      Login
                    </button>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
