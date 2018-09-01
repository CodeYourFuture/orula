import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { getTopics } from "../../../../helpers/api";

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
  render() {
    return (
      <div>
        <ul className="list-group">
          {this.state.topics.map(topic => (
            <li key={topic.topic_id} className="list-group-item">
              <Link
                to={`/lessons/${this.props.lessonId}/topics/${topic.topic_id}`}
              >
                {topic.title}
                {console.log(this.props.lessonId)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default withRouter(ViewTopics);
