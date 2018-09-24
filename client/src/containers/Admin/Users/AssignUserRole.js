import React, { Component } from "react";
import { getUserRoles, getRoles, addRoleToUser } from "../../../helpers/api";

class AssignUserRole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userRoles: [],
      allRoles: [],
      user_id: "",
      name: "",
      email: "",
      message: "",
      messageAlert: ""
    };
  }

  componentDidMount = async () => {
    const user_id = this.props.match.params.userId;
    const { data: userRolesData } = await getUserRoles(user_id);
    const { data: allRoles } = await getRoles();
    const userRoles = userRolesData.map(role => role.role);
    const { name, email } = userRolesData[0];
    this.setState({ user_id, userRoles, allRoles, name, email });
  };

  handleCheckbox = e => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    if (isChecked) {
      this.setState({
        userRoles: [...this.state.userRoles, value]
      });
    } else {
      const userRoles = this.state.userRoles.filter(role => role !== value);
      this.setState({
        userRoles
      });
    }
  };

  onSave = async e => {
    e.preventDefault();
    const { user_id, allRoles, userRoles } = this.state;

    const roles = allRoles.filter(role => {
      return userRoles.includes(role.name);
    });

    if (userRoles.length === 0) {
      this.setState({
        message: "You have to assign at least one role to a user.",
        messageAlert: "alert alert-danger"
      });
    } else {
      try {
        const res = await addRoleToUser(user_id, roles.map(r => r.role_id));
        this.setState({
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
            <h2 className="page-header">Assign Role</h2>
          </div>
        </div>
        {this.state.message && (
          <div className={this.state.messageAlert}>{this.state.message}</div>
        )}
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
                                <input
                                  onChange={e => this.handleCheckbox(e)}
                                  type="checkbox"
                                  value={role.name}
                                  checked={this.state.userRoles.includes(
                                    role.name
                                  )}
                                />
                                {role.name}
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
