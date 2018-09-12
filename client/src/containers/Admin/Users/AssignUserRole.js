import React, { Component } from "react";

class AssignUserRole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roles: [],
      user_id: "",
      message: "",
      messageAlert: ""
    };
  }

  componentDidMount = async () => {
    const user_id = this.props.match.params.userId;
    // const user = await getUserById(user_id);
    // const { name, location, organisation_id } = course.data[0];
    this.setState({
      user_id
      // name,
      // location,
      // organisation_id
    });
  };

  render() {
    console.log(this.state.user_id)
    return (
      <div>
        <div className="row">
          <div className="col-lg-12">
            <h2 className="page-header">Assign Role</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8">
            <div className="table-responsive" />
          </div>
        </div>
      </div>
    );
  }
}

export default AssignUserRole;
