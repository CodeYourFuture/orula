import React, { Component } from "react";
import ViewStudentTopics from "./ViewStudentTopics";
import ViewMentorTopics from "./ViewMentorTopics";
import { getSessionUser, getUserRoles } from "../../../helpers/api";

class TopicsHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMentor: false
    };
  }

  componentDidMount = async () => {
    const userData = await getSessionUser();
    const { data: roles } = await getUserRoles(userData.user_id);
    const userRoles = roles.map(role => role.role);
    if (userRoles.includes("Mentor")) {
      this.setState({ isMentor: true });
    }
  };

  render() {
    console.log(this.state.isMentor)
    return (
      <div>
        {this.state.isMentor ? <ViewMentorTopics /> : <ViewStudentTopics />}
      </div>
    );
  }
}

export default TopicsHome;
