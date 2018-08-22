import React, { Component } from "react";
import { getCourses } from "../../helpers/api";
import { Link } from "react-router-dom";

class Courses extends Component {
  state = {
    courses: []
  };
  componentDidMount() {
    getCourses().then(res => {
      const data = res.data;
      this.setState({ courses: data });
    });
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-lg-12">
            <h2 className="page-header">Courses</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="table-responsive">
              <table className="table table-striped table-bordered table-hover">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.courses.map(course => (
                    <tr key={course.course_id}>
                      <td>1</td>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Link to="/admin/courses/add">
              <button className="btn btn-primary">
                <i className="fa fa-plus fa-fw" /> Add Course
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Courses;
