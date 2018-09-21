import React, { Component } from "react";
import { getStatus } from "../../helpers/api";
import "./Home.css";
class Home extends Component {
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
      <div>
        <p className="home-intro">
          We're building this system to help CYF, and other organisations, to
          manage a Classroom during the lifetime of a course.
        </p>
        <p>{this.state.status}</p>
      </div>
    );
  }
}

export default Home;
