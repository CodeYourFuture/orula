import React from "react";
import { addOrganisation } from "../../../helpers/api";

class AddOrganisation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      message: "",
      messageAlert: ""
    };
  }

  handleOnchange = e => {
    const name = e.target.value;
    this.setState({ name });
  };

  // post it to /api/organisation
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
        await addOrganisation(name);
        this.setState({
          name: "",
          message: "Organisation has been successfully added!",
          messageAlert: "alert alert-success"
        });
      } catch (err) {
        console.log(err)
        this.setState({
          message: "Error occured! Please, try again.",
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
            <h2 className="page-header">Add Organisation</h2>
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
                          onChange={e => this.handleOnchange(e)}
                          value={this.state.name}
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

export default AddOrganisation;
