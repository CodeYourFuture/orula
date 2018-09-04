import React, { Component } from "react";
import { Link } from "react-router-dom";

class Dashboard extends Component {
  render() {
    return (
      <div>
        <h2>Admin Dashboard</h2>
        <div className="row">
          <div className="col-lg-12">
            <Link to="/admin/organisations">
              <button className="btn btn-primary">
                <i className="fa fa-plus fa-fw" />
                View Organisations
              </button>
            </Link>
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
        <div className="row">
          <div className="col-lg-12">
            <Link to="/admin/lessons">
              <button className="btn btn-primary">
                <i className="fa fa-plus fa-fw" />
                View Lessons
              </button>
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <Link to="/admin/lessons/add">
              <button className="btn btn-primary">
                <i className="fa fa-plus fa-fw" /> Add Lesson
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
export default Dashboard;
