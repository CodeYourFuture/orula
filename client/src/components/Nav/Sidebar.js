import React, { Component } from "react";
import { Link } from "react-router-dom";

class Sidebar extends Component {
  logout = () => {
    localStorage.removeItem("jwtToken");
    window.location.reload();
  };

  render() {
    return (
      <ul className="nav navbar-top-links navbar-right">
        <li className="dropdown">
          <a className="dropdown-toggle" data-toggle="dropdown" href="">
            <i className="fa fa-user fa-fw" />
            <i className="fa fa-caret-down" />
          </a>
          <ul className="dropdown-menu dropdown-user">
            <li>
              <Link to="/my-profile">
                <i className="fa fa-user fa-fw" /> My Profile
              </Link>
            </li>
            <li>
              <a href="/">
                <i className="fa fa-gear fa-fw" /> Settings
              </a>
            </li>
            <li className="divider" />
            <li>
              {localStorage.getItem("jwtToken") && (
                <a href="" onClick={this.logout}>
                  <i className="fa fa-sign-out fa-fw" /> Logout
                </a>
              )}
            </li>
          </ul>
        </li>
      </ul>
    );
  }
}

export default Sidebar;
