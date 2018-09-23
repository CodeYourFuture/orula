import React, { Component } from "react";
import { getSessionUser } from "../../helpers/api";
import "./Home.css";

class Home extends Component {
  state = {
    user_id: "",
    course: "My course name"
  };

  componentDidMount() {
    getSessionUser().then(data => {
      this.setState({ user_id: data.user_id });
    });
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-lg-12">
            <h2 className="page-header">{this.state.course}</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            list of lessons
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
