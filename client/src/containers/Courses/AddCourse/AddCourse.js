import React from "react";
import { addCourse } from "../../../helpers/api";

class AddCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      info: "",
      location: "",
      organisation_id: "",
      message: "",
      messageAlert: ""
    };
  }

  handleOnchange = (input, e) => {
    const value = e.target.value;
    this.setState({ [input]: value });
  };

  // post it to /api/organisation
  onSubmit = async e => {
    e.preventDefault();
    const name = this.state.name;
    
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
