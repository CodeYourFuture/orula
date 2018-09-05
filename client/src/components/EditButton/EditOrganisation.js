import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class EditOrganisation extends Component {
  editOrganisation = () => {
    this.props.history.push("/admin/organisation/edit/" + this.props.id);
  };

  render() {
    return (
      <div>
        <div className="row ">
          <div className="col-lg-8" />
          <button className="btn btn-success" onClick={this.editOrganisation}>
            <i className="fa fa-edit fa-fw" /> Edit
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(EditOrganisation);
