import React, { Component } from "react";
import { Link } from "react-router-dom";

class Menu extends Component {
  render() {
    return (
      <div className="navbar-default sidebar" role="navigation">
        <div className="sidebar-nav navbar-collapse">
          <ul className="nav" id="side-menu">
            <li className="sidebar-search">
              <div className="input-group custom-search-form">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                />
                <span className="input-group-btn">
                  <button className="btn btn-default" type="button">
                    <i className="fa fa-search" />
                  </button>
                </span>
              </div>
            </li>
            <li>
              <Link to="/">
                <i className="fa fa-dashboard fa-fw" /> Home
              </Link>
            </li>
            <li>
              <Link to="/my-profile">
                <i className="fa fa-table fa-fw" /> My Profile
              </Link>
            </li>
            <li>
              <Link to="/help">Help</Link>
            </li>
            <li>
              <Link to="/courses">Courses</Link>
            </li>
            <li>
              <Link to="/admin/Lessons">Lessons</Link>
            </li>
            <li>
              <Link to="/dashboard">Organisations</Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Menu;
