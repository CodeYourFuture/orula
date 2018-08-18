import React, { Component } from "react";
import Header from "../../components/Header/Header";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "../Home/Home";
import Help from "../Help/Help";
import AddOrganisation from "../Admin/AddOrganisation/AddOrganisation";
import MyProfile from "../MyProfile/MyProfile";
import "./App.css";
import Menu from "../../components/Menu/Menu";
import Dashboard from "../Dashboard/Dashboard";

class App extends Component {
  render() {
    return (
      <Router>
        <div id="wrapper">
          <Header />
          <div className="navbar" role="navigation" style={{ marginBottom: 0 }}>
            <div
              className="navbar-default sidebar1"
              style={{ minHeight: 775 }}
              role="navigation"
            >
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
                          <i className="fa fa-search">Search</i>
                        </button>
                      </span>
                    </div>
                  </li>
                  <li>
                    <Menu />
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div id="page-wrapper" className="page-wrapper1">
            <div>
              <div className="main-content">
                <Route exact path="/" component={Home} />
                <Route path="/my-profile" component={MyProfile} />
                <Route path="/help" component={Help} />
                <Route path="/dashboard" component={Dashboard} />
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
