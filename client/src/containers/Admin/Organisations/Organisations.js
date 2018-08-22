import React, { Component } from "react";
import { getOrganisations } from "../../../helpers/api";
import { withRouter } from "react-router-dom";

class Organisations extends Component {
  state = {
    organisations: []
  };
  componentDidMount() {
    getOrganisations().then(data => {
      this.setState({ organisations: data });
    });
  }
  render() {
    return (
      <div>
        <p> Admin Dashboard </p>
        <ul className="list-group">
          <li className="list-group-item active">Organisation</li>
          {this.state.organisations.map(data => (
            <li className="list-group-item">
              <a href={`/admin/organisations/${data.organisation_id}`}>
                {data.name}
              </a>
            </li>
          ))}
        </ul>
        <form action="/admin/organisations/add" className="inline">
          <button> Add Organisation </button>
        </form>
      </div>
    );
  }
}

export default withRouter(Organisations);
