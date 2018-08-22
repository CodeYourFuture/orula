import React, { Component } from "react";
class Dashboard extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-lg-12">
            <h2 className="page-header">Organisations</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <button> Add Organisation </button>
          </div>
        </div>
      </div>
    );
  }
}
export default Dashboard;
