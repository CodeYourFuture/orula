import React, { Component } from "react";
import Header from "../../components/Header/Header";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "../Home/Home";
import Help from "../Help/Help";
import AddOrganisation from "../Admin/AddOrganisation/AddOrganisation";
import MyProfile from "../MyProfile/MyProfile";
import "./App.css";
import Menu from "../../components/Menu/Menu";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <Menu />
          <div className="main-content">
            <Route exact path="/" component={Home} />
            <Route path="/my-profile" component={MyProfile} />
            <Route path="/help" component={Help} />
            <Route path="/admin/organisations/add" component={AddOrganisation} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
