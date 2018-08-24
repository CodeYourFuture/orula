import React, { Component } from "react";
import { getCourses } from "../../helpers/api";
import { withRouter } from "react-router-dom";
import ViewLessons from "./ViewLessons";
import { Link } from "react-router-dom";
class Courses extends Component {
  state = {
    courses: [],
    courseId: ""
  };
  componentDidMount() {
    getCourses().then(res => {
      const data = res.data;
      this.setState({ courses: data });
    });
  }
  setCourses = clickEvent => {
    const courseName = clickEvent.target.value;

    const coursesFilter = this.state.courses.filter(title =>
      title.name.includes(courseName)
    );

    const courseId = coursesFilter.map(id => id.course_id);
    this.setState({ courseId });
  }
  
  componentDidMount = async () => {
    const res = await getCourses();
    const courses = res.data;
    console.log(courses);
    this.setState({ courses });
  };

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-lg-12">
            <h2 className="page-header">Courses</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8">
            <div className="table-responsive">
              <table className="table table-striped table-bordered table-hover">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Course Name</th>
                    <th>Location</th>
                    <th>Organisation</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.courses.map(course => (
                    <tr key={course.course_id}>
                      <td>{course.course_id}</td>
                      <td>{course.name}</td>
                      <td>{course.location}</td>
                      <td>{course.organisation_title}</td>
                      <td>
                        <Link to={`/admin/courses/edit/${course.course_id}`}>
                          <button className="btn btn-success">Edit</button>
                        </Link>
                      </td>
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
        <div className="row">
          <div className="col-lg-12" />
          <ViewLessons courseId={this.state.courseId}/>
        </div>
      </div>
    );
  }
}

export default Courses;
