import React, { Component } from "react";
import { getOrganisations } from "../../../helpers/api";
import { withRouter } from "react-router-dom";
import EditOrganisation from "../../../components/EditButton/EditOrganisation";

class Organisations extends Component {
  state = {
    organisations: []
  };
  componentDidMount() {
    getOrganisations().then(res => {
      const data = res.data;
      this.setState({ organisations: data });
    });
  }
  render() {
    return (
      <div>
        <h2 className="page-header"> Admin Dashboard </h2>
        <ul className="list-group">
          <li className="list-group-item active">Organisation</li>
          {this.state.organisations.map(data => (
            <li className="list-group-item">
              <a href={`/admin/organisations/${data.organisation_id}`}>
                {data.name}
              </a>
              <EditOrganisation id={data.organisation_id} />
            </li>
          ))}
        </ul>
        <form action="/admin/organisations/add" className="inline">
          <button className="btn btn-primary"> Add Organisation </button>
        </form>
      </div>
    );
  }
}

export default withRouter(Organisations);
