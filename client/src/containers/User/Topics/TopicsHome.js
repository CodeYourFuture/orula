import React, { Component } from "react";
import ViewStudentTopics from "./ViewStudentTopics";
import ViewMentorTopics from "./ViewMentorTopics";
import { getSessionUser, getUserRoles } from "../../../helpers/api";

class TopicsHome extends Component {
  constructor(props) {
    super(props);
    this.lessonId = props.match.params.lessonId;
    this.state = {
      isMentor: null
    };
  }

  componentDidMount = async () => {
    const userData = await getSessionUser();
    const { data: roles } = await getUserRoles(userData.user_id);
    const userRoles = roles.map(role => role.role);
    this.setState({ isMentor: userRoles.includes("Mentor") });
  };

  renderTopics = () => {
    if (this.state.isMentor === null) {
      return null;
    }
    if (this.state.isMentor) {
      return <ViewMentorTopics lessonId={this.lessonId} />;
    } else {
      return <ViewStudentTopics lessonId={this.lessonId} />;
    }
  };

  render() {
    return this.renderTopics();
  }
}

export default TopicsHome;
