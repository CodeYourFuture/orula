import React, { Component } from "react";
import "./App.css";
import Header from "../../components/Header/Header";
import { getStatus } from "../../helpers/api";

class App extends Component {
  state = {
    status: ""
  };
  componentDidMount() {
    getStatus().then(data => {
      this.setState({ status: JSON.stringify(data) });
    });
  }
  render() {
    return (
      <div className="app">
        <Header />
        <p className="app-intro">
          We're building this system to help CYF, and other organisations, to
          manage a Classroom during the lifetime of a course.
        </p>
        <p>{this.state.status}</p>
      </div>
    );
  }
}

export default App;
