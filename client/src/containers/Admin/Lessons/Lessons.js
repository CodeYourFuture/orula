import React, { Component } from "react";
import { getLessons } from "../../../helpers/api";
import { Link } from "react-router-dom";

class Lessons extends Component {
  state = {
    lessons: []
  }
  componentDidMount = async () => {
    const res = await getLessons();
    const lessons = res.data.sort(function (a, b) {
      return a.name.localeCompare(b.name);
  });;    
    this.setState({ lessons });
  };

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-lg-12">
            <h2 className="page-header">Lessons</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8">
            <div className="table-responsive">
              <table className="table table-striped table-bordered table-hover">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Lesson Name</th>
                    <th>Course Name</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.lessons.sort((a,b)=>a.course_id-b.course_id).map(lesson => (
                    <tr key={lesson.lesson_id}>
                      <td>{lesson.lesson_id}</td>
                      <td>{lesson.name}</td>
                      <td>{lesson.course_title}</td>
                      <td>{lesson.lesson_date}</td>
                      <td>{" "}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Link to="/admin/lessons/add">
              <button className="btn btn-primary">
                <i className="fa fa-plus fa-fw" /> Add Lesson
              </button>
            </Link>
        </div>
        
    );
  }
}

export default Lessons;
