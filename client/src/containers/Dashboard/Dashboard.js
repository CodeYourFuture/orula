import React, { Component } from "react";
class Dashboard extends Component {
  render() {
    return (
      <div>
        <h2>Admin Dashboard</h2>
        <form action="/admin/organisations/" className="inline">
        <button> View Organisation </button>
        </form>
        <form action="/admin/organisations/add" className="inline">
        <button> Add Organisation </button>
        </form>
      </div>
    );
  }
}
export default Dashboard;
