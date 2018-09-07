import React from "react";
import { addUser, getUsers, loginUser } from "../../helpers/api";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      users: [],
      message: "",
      messageAlert: ""
    };
  }
  componentDidMount = async () => {
    const data = await getUsers();
    this.setState({ users: data });
  };

  handleOnchange = (input, e) => {
    const value = e.target.value;
    this.setState({ [input]: value });
  };

  // post it to /api/users
  onSubmit = async e => {
    e.preventDefault();
    const { name, email, password } = this.state;
    if (name === "" || email === "" || password === "") {
      this.setState({
        message: "You must fill all the fields!",
        messageAlert: "alert alert-danger"
      });
    } else {
      try {
        const res = await addUser(name, email, password);
        await loginUser(email, password); // if this is successful go to next line
        this.setState({
          name: "",
          email: "",
          password: "",
          message: res.data,
          messageAlert: "alert alert-success"
        });
        setTimeout(() => this.props.history.push("/"), 1000);
      } catch (err) {
        this.setState({
          message: err.response.data,
          messageAlert: "alert alert-danger"
        });
      }
    }
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-md-offset-4">
            <div className="login-panel panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Please Sign Up</h3>
              </div>
              <div className="panel-body">
                <form>
                  <fieldset>
                    <div className="form-group">
                      <input
                        className="form-control"
                        placeholder="Name"
                        name="name"
                        type="name"
                        onChange={e => this.handleOnchange("name", e)}
                        value={this.state.name}
                        autoFocus
                      />
                    </div>
                    <div className="form-group">
                      <input
                        onChange={e => this.handleOnchange("email", e)}
                        className="form-control"
                        placeholder="E-mail"
                        name="email"
                        type="email"
                        value={this.state.email}
                        autoFocus
                      />
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control"
                        placeholder="Password"
                        name="password"
                        type="password"
                        onChange={e => this.handleOnchange("password", e)}
                        value={this.state.password}
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-lg btn-success btn-block"
                      onClick={e => this.onSubmit(e)}
                    >
                      Register
                    </button>
                  </fieldset>
                </form>
              </div>
            </div>
            {this.state.message && (
              <div className={this.state.messageAlert}>
                {this.state.message}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
