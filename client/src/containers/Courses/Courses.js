import React, { Component } from "react";
import { getCourses } from "../../helpers/api";
import { withRouter } from "react-router-dom";
import ViewLessons from "./ViewLessons";
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
      title.course_title.includes(courseName)
    );

    const courseId = coursesFilter.map(id => id.course_id);
    this.setState({ courseId });

    this.props.history.push("/courses/" + courseId);
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
          <div className="col-lg-12">
            <select onChange={event => this.setCourses(event)}>
              <option>Select Course</option>
              {this.state.courses.map(course => (
                <option key={course.course_id}>{course.course_title}</option>
              ))}
            </select>
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

export default withRouter(Courses);
