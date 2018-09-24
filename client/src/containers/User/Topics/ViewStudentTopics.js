import React, { Component } from "react";
import { getTopicsByLessonId } from "../../../helpers/api";

class ViewStudentTopics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: []
    };
  }
  componentDidMount = async () => {
    const response = await getTopicsByLessonId(
      this.props.match.params.lessonId
    );
    this.setState({ topics: response.data });
  };

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-lg-12">
            <h2 className="page-header">Topics</h2>
          </div>
        </div>
        <ul className="list-group">
          {this.state.topics.map(topic => (
            <li key={topic.topic_id} className="list-group-item">
              <div className="row">
                <div className="col-lg-6">{topic.title}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ViewStudentTopics;
