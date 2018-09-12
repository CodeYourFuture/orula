import React, { Component } from "react";
import { getUsers } from "../../../helpers/api";

class Users extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-lg-12">
            <h2 className="page-header">Users</h2>
          </div>
        </div>
        <div className="row">
        <div className="col-lg-8">
          <div className="table-responsive">
            <table className="table table-striped table-bordered table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default Users;
