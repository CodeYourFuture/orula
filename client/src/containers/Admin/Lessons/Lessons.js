import React, { Component } from "react";
import { getLessons, deleteLesson } from "../../../helpers/api";
import { withRouter } from "react-router-dom";

class Lessons extends Component {
  state = {
    lessons: [],
    message: "",
    messageAlert: ""
  };
  componentDidMount() {
    getLessons().then(data => {
      this.setState({ lessons: data });
    });
  }
  deleteLesson = lesson_id => {
    try {
      const res = deleteLesson(lesson_id);
      const newLessons = this.state.lessons.filter(
        lesson => lesson.lesson_id !== lesson_id
      );
      console.log(`afterdelete res = `, res);
      this.setState({
        lessons: newLessons,
        message: res.data,
        messageAlert: "alert alert-success"
      });
      console.log(`afterdelete lessons = `, this.state.lessons);
    } catch (err) {
      this.setState({
        message: err.response.data,
        messageAlert: "alert alert-danger"
      });
    }
  };
  render() {
    console.log(`lessons in render = `, this.state.lessons);

    return (
      <div>
        <h2 className="page-header">Admin Dashboard</h2>
        <ul className="list-group">
          <li className="list-group-item active">Lessons</li>
          {this.state.lessons.map((data, index) => (
            <li key={index} className="list-group-item">
              <div className="row">
                <div className="col-lg-6">
                  <a href={`/admin/lesssons/${data.lesson_id}`}>{data.name}</a>
                </div>

                <div className="col-lg-3">
                  <button
                    onClick={() => this.deleteLesson(data.lesson_id)}
                    className="btn btn-danger"
                  >
                    <i className="fa fa-trash " /> Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default withRouter(Lessons);
