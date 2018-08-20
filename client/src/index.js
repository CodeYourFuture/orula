import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./index.css";
import App from "./containers/App/App";
import Login from "./components/Login/Login";

ReactDOM.render(
  <Router>
    <div>
    <Route exact path="/login" component={Login} />
    <Route path="/" component={App} />
    </div>
  </Router>,
  document.getElementById("root")
);
