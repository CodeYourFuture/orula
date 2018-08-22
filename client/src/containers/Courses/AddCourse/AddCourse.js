import React from "react";
import { addCourse, getOrganisations } from "../../../helpers/api";

class AddCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      location: "",
      organisation_id: "",
      organisations: [],
      message: "",
      messageAlert: ""
    };
  }

  componentDidMount = async () => {
    const res = await getOrganisations();
    const data = res.data;
    this.setState({ organisations: data });
  };

  handleOnchange = (input, e) => {
    const value = e.target.value;
    this.setState({ [input]: value });
  };

  setOrganisation = e => {
    const organisationName = e.target.value;
    const organisation = this.state.organisations.find(
      organisation => organisation.name === organisationName
    );
    // check if organisation is selected then set state
    if (organisation) {
      this.setState({ organisation_id: organisation.organisation_id });
    } else {
      this.setState({ organisation_id: "" })
    }
  };

  // post it to /api/organisation
  onSubmit = async e => {
    e.preventDefault();
    const { name, location, organisation_id } = this.state;
    if (name === "" || location === "" || organisation_id === "") {
      this.setState({
        message: "You must fill all the fields!",
        messageAlert: "alert alert-danger"
      });
    } else {
      try {
        const res = await addCourse(name, location, organisation_id);
        this.setState({
          name: "",
          location: "",
          message: res.data,
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
            <h2 className="page-header">Add Course</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="panel panel-default">
              <div className="panel-heading">Course details</div>
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
                          onChange={e => this.handleOnchange("name", e)}
                          value={this.state.name}
                        />
                      </div>
                      <div className="form-group">
                        <label className="control-label" htmlFor="location">
                          Location
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="location"
                          id="location"
                          onChange={e => this.handleOnchange("location", e)}
                          value={this.state.location}
                        />
                      </div>
                      <div className="form-group">
                        <label
                          className="control-label"
                          htmlFor="organisation_id"
                        >
                          Organisation
                        </label>
                        <select
                          className="form-control"
                          name="organisation_id"
                          id="organisation_id"
                          onChange={e => this.setOrganisation(e)}
                        >
                          <option>Select</option>
                          {this.state.organisations.map(organisation => (
                            <option key={organisation.organisation_id}>
                              {organisation.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={e => this.onSubmit(e)}
                      >
                        Submit
                      </button>
                    </form>
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

export default AddCourse;
