import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "../Home/Home";
import Help from "../Help/Help";
import MyProfile from "../../components/MyProfile/MyProfile";
import "./App.css";
import Dashboard from "../Dashboard/Dashboard";
import Courses from "../Courses/Courses";
import Nav from "../../components/Nav/Nav";

class App extends Component {
  render() {
    return (
      <Router>
        <div id="wrapper">
          <Nav />
          <div id="page-wrapper">
            <Route exact path="/" component={Home} />
            <Route path="/my-profile" component={MyProfile} />
            <Route path="/help" component={Help} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/courses" component={Courses} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
