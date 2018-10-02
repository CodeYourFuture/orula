import React, { Component } from "react";
import { getOrganisations, deleteOrganisation } from "../../../helpers/api";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import EditOrganisation from "../../../components/EditButton/EditOrganisation";

class Organisations extends Component {
  state = {
    organisations: [],
    message: "",
    messageAlert: ""
  };
  componentDidMount = async ()=>{
    const res = await  getOrganisations()
    const organisations =res.data;
    this.setState({organisations});
  };
  deleteOrganisation = async organisation_id => {
    try {
      const res = await deleteOrganisation(organisation_id);
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
        <div>{this.state.message && (
              <div className={this.state.messageAlert}>
                {this.state.message}
              </div>
            )}</div>
        <ul className="list-group">
          <li className="list-group-item active">Organisation</li>
          {this.state.organisations.map((data, index) => (
            <li key={index} className="list-group-item">
              <div className="row">
                <div className="col-lg-6">
                  <a href={`/admin/organisations/${data.organisation_id}`}>
                    {data.name}
                  </a>
                </div>
                <div className="col-lg-3">
                  <EditOrganisation id={data.organisation_id} />
                </div>
                <div className="col-lg-3">
                  <button
                    onClick={() =>
                      this.deleteOrganisation(data.organisation_id)
                    }
                    className="btn btn-primary"
                  >
                    <i className="fa fa-trash " /> Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="row">
          <div className="col-lg-12">
            <Link to="/admin/organisations/add">
              <button className="btn btn-primary">
                <i className="fa fa-plus fa-fw" /> Add Organisation
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Organisations);
