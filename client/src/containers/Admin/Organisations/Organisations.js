import React, { Component } from "react";
import { getOrganisations, deleteOrganisation } from "../../../helpers/api";
import { withRouter } from "react-router-dom";
import EditOrganisation from "../../../components/EditButton/EditOrganisation";

class Organisations extends Component {
  state = {
    organisations: [],
    message: "",
    messageAlert: ""
  };
  componentDidMount() {
    getOrganisations().then(data => {
      this.setState({ organisations: data });
    });
  }
  deleteOrganisation = organisation_id => {
    try {
      const res = deleteOrganisation(organisation_id);
      console.log(res);
      const organisations = this.state.organisations.filter(
        organisation => organisation.organisation_id !== organisation_id
      );
      this.setState({
        organisations,
        message: res.data,
        messageAlert: "alert alert-success"
      });
    } catch (err) {
      this.setState({
        message: err.response.data,
        messageAlert: "alert alert-danger"
      });
    }
  };
  render() {
    return (
      <div>
        <h2 className="page-header">Admin Dashboard</h2>
        <ul className="list-group">
          <li className="list-group-item active">Organisation</li>
          {this.state.organisations.map((data, index) => (
            <li key={index} className="list-group-item">
              <div className="row">
                <div className="col-lg-9">
                  <a href={`/admin/organisations/${data.organisation_id}`}>
                    {data.name}
                  </a>
                </div>
                <div className="col-lg-3" />
                <button
                  onClick={() => this.deleteOrganisation(data.organisation_id)}
                  className="btn btn-primary"
                >
                  <i className="fa fa-trash " /> Delete
                </button>
                <EditOrganisation id={data.organisation_id} />
              </div>
            </li>
          ))}
        </ul>
        <form action="/admin/organisations/add" className="inline">
          <button className="btn btn-primary">
            {" "}
            <i className="fa fa-plus fa-fw" /> Add Organisation{" "}
          </button>
        </form>
      </div>
    );
  }
}

export default withRouter(Organisations);
