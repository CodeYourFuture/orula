import React, { Component } from "react";
import { getCourses } from "../../helpers/api";
import { withRouter } from "react-router-dom";

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
  setCourses = clickEvent => {
    const courseName = clickEvent.target.value;

    const coursesFilter = this.state.courses.filter(title =>
      title.course_title.includes(courseName)
    );

    const courseId = coursesFilter.map(id => id.course_id);

    this.props.history.push("/courses/" + courseId);
  };
  render() {
    return (
      <div>
        <select onChange={event => this.setCourses(event)}>
          <option>Please Select Your Course </option>
          {this.state.courses.map(course => (
            <option key={course.course_id}>{course.course_title}</option>
          ))}
        </select>
      </div>
    );
  }
}

export default withRouter(Courses);
