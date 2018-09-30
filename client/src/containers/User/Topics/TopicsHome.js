import React, { Component } from "react";
import ViewStudentTopics from "./ViewStudentTopics";
import ViewMentorTopics from "./ViewMentorTopics";
import { getSessionUser, getUserRoles } from "../../../helpers/api";

class TopicsHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMentor: null
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
    const lessonId = this.props.match.params.lessonId;
    return (
      <div>
        {this.state.isMentor && this.state.isMentor !== null ? (
          <ViewMentorTopics lessonId={lessonId} />
        ) : (
          <ViewStudentTopics lessonId={lessonId} />
        )}
      </div>
    );
  }
}

export default TopicsHome;
