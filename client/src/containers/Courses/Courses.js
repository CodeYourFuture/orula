import React, { Component } from "react";
import { getCourses, deleteCourse } from "../../helpers/api";
import ViewLessons from "./ViewLessons";
import { Link } from "react-router-dom";

class Courses extends Component {
  state = {
    courses: [],
    message: "",
    messageAlert: "",
    courseId: ""
  };
 
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
    this.setState({ courses });
  };

  deleteCourse = async course_id => {
    try {
      const res = await deleteCourse(course_id);
      const courses = this.state.courses.filter(
        course => course.course_id !== course_id
      );
      this.setState({
        courses,
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
            <h2 className="page-header">Courses</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8">
            {this.state.message && (
              <div className={this.state.messageAlert}>
                {this.state.message}
              </div>
            )}
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
                        </Link>{" "}
                        <button
                          onClick={() => this.deleteCourse(course.course_id)}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
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
