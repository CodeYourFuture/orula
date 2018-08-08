import React, { Component } from "react";
import Header from "../../components/Header/Header";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "../Home/Home";
import Help from "../Help/Help";
import MyProfile from "../MyProfile/MyProfile";
import "./App.css";
import Menu from "../../components/Menu/Menu";

class App extends Component {
  render() {
    return ( 
    <Router>      
    <div id="wrapper">
    <Header />
    <div className="navbar navbar-default navbar-static-top" role="navigation" style={{marginBottom: 0}}>
        <div className="navbar-default sidebar" role="navigation">
            <div className="sidebar-nav navbar-collapse">
                <ul className="nav" id="side-menu">
                    <li className="sidebar-search">
                        <div className="input-group custom-search-form">
                            <input type="text" className="form-control" placeholder="Search..."/>
                            <span className="input-group-btn">
                            <button className="btn btn-default" type="button">
                                <i className="fa fa-search"></i>
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

    <div id="page-wrapper">
        <div>
          
          <div className="main-content">
            <Route exact path="/" component={Home} />
            <Route path="/my-profile" component={MyProfile} />
            <Route path="/help" component={Help} />
          </div>
        </div>
    </div>

    </div>
    </Router>
    
    );
  }
}

export default App;
