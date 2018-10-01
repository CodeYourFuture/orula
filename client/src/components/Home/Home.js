import React, { Component } from "react";
import MentorHome from "./MentorHome";
import StudentHome from "./StudentHome";

import { getSessionUser, getUserRoles } from "../../helpers/api";

class Home extends Component {
  state = {
    isMentor: null
  };

  componentDidMount = async () => {
    const userData = await getSessionUser();
    const { data: roles } = await getUserRoles(userData.user_id);
    const userRoles = roles.map(user => user.role);
    this.setState({ isMentor: userRoles.includes("Mentor") });
  };
  renderTopics = () => {
    if (this.state.isMentor === null) {
      return null;
    }
    if (this.state.isMentor) {
      return <MentorHome />;
    } else {
      return <StudentHome />;
    }
  };

  render() {
    return this.renderTopics();
  }
}
export default Home;
