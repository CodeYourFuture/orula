import React, { Component } from "react";
import { Link } from "react-router-dom";

class Dashboard extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-lg-12">
            <h2 className="page-header">Organisations</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <Link to="/admin/organisations/add">
              <button className="btn btn-primary">
                <i className="fa fa-plus fa-fw" /> Add Organisation
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
export default Dashboard;
