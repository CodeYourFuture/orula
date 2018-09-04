import React, { Component } from "react";

import { getLessons, deleteLesson, getCourses } from "../../../helpers/api";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

class Lessons extends Component {
  state = {
    courses: [],
    lessons: [],
    message: "",
    messageAlert: "",
    lessonId: ""
  };
  componentDidMount() {
    getLessons().then(data => {
      this.setState({ lessons: data });
    }); 
    getCourses().then(res => res.data).then(data => {
      this.setState({ courses: data });
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

        <h2 className="page-header">Lessons</h2>
        <div className="table-responsive">
        {this.state.courses.map(course => (
          <div>
        <h2 className="page-header">{course.name}</h2>
          <table className="table table-striped table-bordered table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Lesson Name</th>
                <th>lesson_date</th>
                <th>course_title</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.lessons.filter(lesson=>lesson.course_title===course.name).map(lesson => (
                <tr key={lesson.lesson_id}>
                  <td>{lesson.lesson_id}</td>
                  <td> <Link to={`/admin/lessons/${lesson.lesson_id}/topics`}>
                    {lesson.name}
                  </Link></td>
                  <td>{lesson.location}</td>
                  <td>{lesson.course_title}</td>
                  <td>
                    <button
                      onClick={() => this.deleteLesson(lesson.lesson_id)}
                      className="btn btn-danger"
                    >
                      <i className="fa fa-trash " /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>

          ))}
        </div>
        <div className="row">
          <div className="col-lg-12">
            <Link to="/admin/lessons/add">
              <button className="btn btn-primary">
                <i className="fa fa-plus fa-fw" /> Add Lesson
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Lessons);
