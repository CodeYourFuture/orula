import React, { Component } from "react";
import { updateOrganisations, getOrganisations } from "../../../../helpers/api";
class UpdateOrganisation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      message: "",
      messageAlert: "",
      orgs: []
    };
  }
  componentDidMount() {
    getOrganisations().then(res => {
      const data = res.data;
      this.setState({ orgs: data });
    });
  }
  onHandleChange = e => {
    const name = e.target.value;
    this.setState({ name });
  };
  //Id = this.props.match.params.organisation_id;
  goBackOrganisation = () => {
    this.props.history.push("/admin/organisations");
  };

  // put it to /api/organisation
  onSave = async e => {
    e.preventDefault();
    const name = this.state.name;
    if (name === "") {
      this.setState({
        message: "It is empty!",
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
                          name="name"
                          id="name"
                          onChange={e => this.onHandleChange(e)}
                          value={this.state.name}
                        />
                      </div>
                      <button
                        type="save"
                        className="btn btn-primary"
                        onClick={e => this.onSave(e)}
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
                        onClick={this.goBackOrganisation}
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
