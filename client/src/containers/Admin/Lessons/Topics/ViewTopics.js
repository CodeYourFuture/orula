import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { getTopicsByLessonId, deleteTopic } from "../../../../helpers/api";

class ViewTopics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: [],
      message: "",
      messageAlert: ""
    };
  }
  componentDidMount = async () => {
    const response = await getTopicsByLessonId(
      this.props.match.params.lessonId
    );
    this.setState({ topics: response.data });
  };

  deleteTopic = async topic_id => {
    try {
      const res = await deleteTopic(topic_id);
      const topics = this.state.topics.filter(
        topic => topic.topic_id !== topic_id
      );
      this.setState({
        topics,
        message: res.data,
        messageAlert: "alert alert-success"
      });
    } catch (err) {
      this.setState({
        message: err.response.data,
        messageAlert: "alert alert-danger"
      });
    }
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
                <div className="col-lg-3">
                  <button
                    onClick={() => this.deleteTopic(topic.topic_id)}
                    className="btn btn-danger"
                  >
                    <i className="fa fa-trash " /> Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div>
          <Link
            to={`/admin/topics/add?lessonId=${
              this.props.match.params.lessonId
            }`}
          >
            <button className="btn btn-primary">
              <i className="fa fa-plus fa-fw" /> Add topic
            </button>
          </Link>

          {this.state.message && (
            <div className={this.state.messageAlert}>{this.state.message}</div>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(ViewTopics);
