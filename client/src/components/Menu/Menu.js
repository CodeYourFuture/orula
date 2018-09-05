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
                <i className="fa fa-home fa-fw" /> Home
              </Link>
            </li>
            <li>
              <Link to="/my-profile">
                <i className="fa fa-address-book fa-fw" /> My Profile
              </Link>
            </li>
            <li>
              <Link to="/help">
                <i className="fa fa-question-circle fa-fw" /> Help
              </Link>
            </li>
            <li>
              <Link to="/admin/courses">
                <i className="fa fa-graduation-cap fa-fw" /> Courses
              </Link>
            </li>
            <li>
              <Link to="/admin/Lessons">
                <i className="fa fa-book fa-fw" /> Lessons
              </Link>
            </li>
            <li>
              <Link to="/dashboard">
                <i className="fa fa-sitemap fa-fw" /> Organisations
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Menu;
