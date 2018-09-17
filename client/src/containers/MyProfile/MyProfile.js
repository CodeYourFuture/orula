import React, { Component } from "react";
import { getSessionUser } from "../../helpers/api";

class MyProfile extends Component {
  state = {
    user_id: "",
    email: "",
    name: ""
  };
  componentDidMount() {
    getSessionUser().then(data => {
      this.setState({
        user_id: data.user_id,
        email: data.email,
        name: data.name
      });
    });
  }
  render() {
    return (
      <div className="row">
        <div className="col-lg-12">
          <h1 className="page-header">My profile</h1>
          <div className="table-responsive">
            <table
              className
              className="table table-striped table-bordered table-hover"
            >
              <thead>
                <tr>
                  <th>#</th>
                  <th>User Name</th>
                  <th>User Email</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{this.state.user_id}</td>
                  <td>{this.state.name}</td>
                  <td>{this.state.email}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default MyProfile;
