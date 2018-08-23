import React, { Component } from "react";
import { updateOrganisations } from "../../helpers/api";
import { withRouter } from "react-router-dom";

class Edit extends Component {
  state = {
    updateOrganisation: []
  };
  componentDidMount() {
    updateOrganisations().then(data => {
      this.setState({ updateOrganisation: data });
    });
  }

  updateOrganisation = clickEvent => {
    const organisationName = clickEvent.target.value;

    const updateOrganisationFilter = this.state.updateOrganisation.filter(
      title => title.course_title.includes(organisationName)
    );

    const organisation_id = updateOrganisationFilter.map(
      id => id.organisation_id
    );

    this.props.history.push("/admin/organisation/Edit/" + organisation_id);
  };

  render() {
    return (
      <div className="row justify-content-end ">
        <div className="col-lg-12">
          <button
            type="edit"
            className="btn btn-primary"
            onClick={e => this.updateOrganisation(e)}
          >
            Edit
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(Edit);
