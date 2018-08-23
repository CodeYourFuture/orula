import React, { Component } from "react";
import { updateOrganisations } from "../../../../helpers/api";

class UpdateOrganisation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      message: "",
      messageAlert: ""
    };
  }

  onHandleChange = e => {
    const name = e.target.value;
    this.setState({ name });
  };

  // put it to /api/organisation
  onSubmit = async e => {
    e.preventDefault();
    const name = this.state.name;
    if (name === "") {
      this.setState({
        message: "You must provide a name!",
        messageAlert: "alert alert-danger"
      });
    } else {
      try {
        await updateOrganisations(name);
        this.setState({
          name: "",
          message: "Organisation has been successfully updated!",
          messageAlert: "alert alert-success"
        });
      } catch (err) {
        this.setState({
          message: err.response.data,
          messageAlert: "alert alert-danger"
        });
      }
    }
  };
  render() {
    return (
      <div className="row">
        <div className="col-lg-12">
          <h1 className="page-header">Edit Organisation</h1>
          <input
            className="form-control"
            placeholder="Edit"
            name="name"
            type="Edit"
            onChange={e => this.onHandleChange("name", e)}
            value={this.name}
          />
        </div>
      </div>
    );
  }
}

export default UpdateOrganisation;
