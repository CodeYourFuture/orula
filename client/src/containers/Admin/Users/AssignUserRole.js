import React, { Component } from "react";
import { getUserRoles, getRoles } from "../../../helpers/api";

class AssignUserRole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userRoles: [],
      allRoles: [],
      user_id: "",
      message: "",
      name: "",
      isChecked: false,
      email: "",
      messageAlert: ""
    };
  }

  componentDidMount = async () => {
    const user_id = this.props.match.params.userId;
    const userRolesData = await getUserRoles(user_id);
    const allRolesData = await getRoles();
    const allRoles = allRolesData.data.map(role => role.name);
    const userRoles = userRolesData.data.map(role => role.role);
    const { name, email } = userRolesData.data[0];
    this.setState({ user_id, userRoles, allRoles, name, email });
  };


  handleCheckbox = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    if(isChecked){
      this.setState({
        userRoles: [...this.state.userRoles, value]
      })
    } else {
      const userRoles = this.state.userRoles.filter(role => role !== value)
      this.setState({
        userRoles
      })
    }
  } 


  render() {
    console.log(this.state.userRoles)
    return (
      <div>
        <div className="row">
          <div className="col-lg-12">
            <h2 className="page-header">Assign Role</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8">
            <div className="panel panel-default">
              <div className="panel-heading">User Roles</div>
              <div className="panel-body">
                <form>
                  <div className="row">
                    <div className="col-md-5">
                      <div className="form-group">
                        <label>Name</label>
                        <p className="form-control-static">{this.state.name}</p>
                      </div>
                    </div>
                    <div className="col-md-5">
                      <div className="form-group">
                        <label>Email</label>
                        <p className="form-control-static">
                          {this.state.email}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-8">
                      <div className="form-group">
                        <label>Roles</label>
                        {this.state.allRoles.map((role, i) => {
                          return (
                            <div key={i} className="checkbox">
                              <label>
                                <input onChange={e => this.handleCheckbox(e)} type="checkbox" value={role} checked={this.state.userRoles.includes(role)} />
                                {role}
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={e => this.onSave(e)}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AssignUserRole;
