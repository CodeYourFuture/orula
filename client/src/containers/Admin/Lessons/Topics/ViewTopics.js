import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { getTopicsByLessonId, deleteTopic } from "../../../../helpers/api";

class ViewTopics extends Component {
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
              {topic.title}
            </li>
          ))}
        </ul>
        <div>
          <Link to="/admin/topics/add?lessonId=1">
            <button className="btn btn-primary">
              <i className="fa fa-plus fa-fw" /> Add topic
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default withRouter(ViewTopics);
