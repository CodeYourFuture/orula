import React, { Component } from "react";
import { getUserProfile, updateUserProfile } from "../../../helpers/api";
import { Link } from "react-router-dom";

class EditUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: "",
      name: "",
      message: "",
      messageAlert: ""
    };
  }

  componentDidMount = async () => {
    const user_id = this.props.match.params.userID;
    const user = await getUserProfile(user_id);
    const { name, email, password } = user.data[0];
    this.setState({ user_id, name, email, password });
  };

  handleOnchange = (input, e) => {
    const value = e.target.value;
    this.setState({ [input]: value });
  };

  // put it to /api/courses/:id
  onSubmit = async e => {
    e.preventDefault();
    const { user_id, name, email, password } = this.state;
    if (name === "" || email === "") {
      this.setState({
        message: "You must fill all the fields!",
        messageAlert: "alert alert-danger"
      });
    } else {
      try {
        const res = await updateUserProfile(user_id, name, email, password);
        this.setState({
          message: res.data,
          messageAlert: "alert alert-success"
        });
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
      <div>
        <div className="row">
          <div className="col-lg-12">
            <h2 className="page-header">Edit user profile</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="panel panel-default">
              <div className="panel-heading">User details</div>
              <div className="panel-body">
                <div className="row">
                  <div className="col-lg-6">
                    <form>
                      <div className="form-group">
                        <label className="control-label" htmlFor="name">
                          Name
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="name"
                          id="name"
                          onChange={e => this.handleOnchange("name", e)}
                          value={this.state.name}
                        />
                      </div>
                      <div className="form-group">
                        <label className="control-label" htmlFor="email">
                          Email
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="email"
                          id="email"
                          onChange={e => this.handleOnchange("email", e)}
                          value={this.state.email}
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={e => this.onSubmit(e)}
                      >
                        Save
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            {this.state.message && (
              <div className={this.state.messageAlert}>
                {this.state.message}
              </div>
            )}
          </div>
          <div className="col-lg-12">
            <Link to="/user/profile">
              <button className="btn btn-primary">
                <i className="fa fa-eye fa-fw" /> return
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default EditUser;
