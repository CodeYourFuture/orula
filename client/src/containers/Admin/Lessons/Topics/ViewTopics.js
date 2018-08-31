import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { getTopics } from "../../helpers/api";
import Lessons from "../Lessons";

class ViewTopics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: []
    };
  }
  componentDidMount() {
    getTopics().then(data => {
      this.setState({ topics: data });
    });
  }
  render(props) {
    return (
      <div>
        <ul className="list-group">
          {this.state.topics.map(topic => (
            <li key={topic.topic_id} className="list-group-item">
              <a
                href={`/lessons/${Lessons.lesson_id}/topics/${topic.topic_id}`}
              >
                {topic.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default withRouter(ViewTopics);
