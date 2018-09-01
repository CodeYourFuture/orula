import React, { Component } from "react";
import { getLessons, deleteLesson } from "../../../helpers/api";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

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
      this.setState({
        lessons: newLessons,
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
        <Link to="/admin/Lessons/add">
          <button className="btn btn-primary">
            <i className="fa fa-plus fa-fw" /> Add Lesson
          </button>
        </Link>
      </div>
    );
  }
}

export default withRouter(Lessons);
