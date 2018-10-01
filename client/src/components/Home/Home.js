import React, { Component } from "react";
import MentorHome from "./MentorHome";
import StudentHome from "./StudentHome";

import { getSessionUser, getUserRoles } from "../../helpers/api";

class Home extends Component {
  state = {
    isMentor: false
  };

  async componentDidMount() {
    const userData = await getSessionUser();
    const { data: roles } = await getUserRoles(userData.user_id);
    const userRoles = roles.map(role => role.role);

    if (userRoles.includes("Mentor")) {
      this.setState({ isMentor: true });
    }
  }

  render() {
    return <div>{this.state.isMentor ? <MentorHome /> : <StudentHome />}</div>;
  }
}
export default Home;
