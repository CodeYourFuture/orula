import React, { Component } from "react";
import { getUserProfileById } from "../../helpers/api";

class StudentProfile extends Component {
  state = {
    user_id: "",
    email: "",
    name: ""
  };
  componentDidMount() {
      const userId=window.location.href.slice(38);
    getUserProfileById(userId ).then(res => {
      this.setState({
        user_id: res.data.user_id,
        email: res.data.email,
        name: res.data.name
      });
    });
    
  }
  render() {
    return (
      <div className="row">
        <div className="col-lg-12">
          <h1 className="page-header">Student profile</h1>
          <div className="table-responsive">
            <table className="table table-striped table-bordered table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Student Name</th>
                  <th>Student Email</th>
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

export default StudentProfile;
