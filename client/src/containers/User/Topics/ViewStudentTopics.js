import React, { Component } from "react";
import { getTopicsByLessonId, getLessonsById } from "../../../helpers/api";
import { Link } from "react-router-dom";

class ViewStudentTopics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: [],
      lessonName: "",
      message: "",
      messageAlert: ""
    };
  }
  componentDidMount = async () => {
    const lessonId = this.props.match.params.lessonId;
    const response = await getTopicsByLessonId(lessonId);
    const { data: lesson } = await getLessonsById(lessonId);
    this.setState({ topics: response.data, lessonName: lesson[0].name });
  };

  onSave = async e => {
    e.preventDefault();
  };

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-lg-12">
            <h2 className="page-header">{this.state.lessonName}</h2>
          </div>
        </div>

        {this.state.message && (
          <div className={this.state.messageAlert}>{this.state.message}</div>
        )}
        <div className="row">
          <div className="col-md-12">
            <div className="table-responsive">
              <table className="table table-striped table-bordered table-hover">
                <thead>
                  <tr>
                    <th>Topic name</th>
                    <th>Rating before the class</th>
                    <th>Rating after the class</th>
                    <th>Rating 3 days later</th>
                    <th>Rating 1 week later</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.topics.map(topic => (
                    <tr key={topic.topic_id}>
                      <td>{topic.title}</td>
                      <td>sadf</td>
                      <td>sadf</td>
                      <td>sadf</td>
                      <td>sadf</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button className="btn btn-success" onClick={e => this.onSave(e)}>
              Save Ratings
            </button>
            {" "}
            <Link to="/">
              <button className="btn btn-info">Go back</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewStudentTopics;
