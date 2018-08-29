import React, { Component } from "react";
import {
  updateOrganisations,
  getOrganisationsById
} from "../../../../helpers/api";

class UpdateOrganisation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      organisation_id: "",
      name: "",
      message: "",
      messageAlert: ""
    };
  }
  componentDidMount = async () => {
    const organisation_id = this.props.match.params.organisation_id;
    const Id = await getOrganisationsById(organisation_id);
    const { name } = Id.data[0];
    this.setState({ organisation_id, name });
  };
  onHandleChange = (input, e) => {
    const value = e.target.value;
    this.setState({ [input]: value });
  };
  goBackToOrganisation = () => {
    this.props.history.push("/admin/organisations");
  };

  // put it to /api/organisation
  onSave = async (input, e) => {
    const value = e.target.value;
    e.preventDefault();
    const { name, organisation_id } = this.state;
    if (name === "") {
      this.setState({
        message: "The Name field is empty!",
        messageAlert: "alert alert-danger"
      });
    } else {
      try {
        this.setState({
          message: "Organisation has been successfully updated!",
          messageAlert: "alert alert-success"
        });

        await updateOrganisations(organisation_id, name);
      } catch (err) {
        this.setState({
          message: [err.response.data],
          messageAlert: "alert alert-danger"
        });
      }
    }
  };
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-lg-12">
            <h2 className="page-header">Edit Organisation</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="panel panel-default">
              <div className="panel-heading">Organisation details</div>
              <div className="panel-body">
                <div className="row">
                  <div className="col-lg-6">
                    <form>
                      <div className="form-group">
                        <label className="control-label" htmlFor="name">
                          Name
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          id="name"
                          onChange={e => this.onHandleChange("name", e)}
                          value={this.state.name}
                        />
                      </div>
                      <button
                        type="save"
                        className="btn btn-primary"
                        onClick={e => this.onSave("name", e)}
                        value={this.state.name}
                      >
                        <i className="fa fa-save fa-fw" />
                        Save
                      </button>
                    </form>
                    <hr />
                    <div className="row col-lg-2 ">
                      <button
                        type="save"
                        className="btn btn-primary"
                        onClick={this.goBackToOrganisation}
                      >
                        <i className="fa fa-eye fa-fw" />
                        View all organisations
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {this.state.message && (
              <div className={this.state.messageAlert}>
                {this.state.message}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default UpdateOrganisation;
