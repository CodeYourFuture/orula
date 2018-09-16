import React, { Component } from "react";
import { Link } from "react-router-dom";

class MyProfile extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-lg-12">
          <h1 className="page-header">My profile</h1>
          <Link to={`/user/profile/edit`}>
            <button className="btn btn-success">
              <i className="fa fa-edit fa-fw" /> Edit
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default MyProfile;
