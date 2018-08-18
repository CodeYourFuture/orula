import React, { Component } from "react";
import { getCourses } from "../../helpers/api";
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
    //console.log(`courseName = `, courseName);
    const coursesFilter = this.state.courses.filter(title =>
      title.course_title.includes(courseName)
    );
    //console.log(`courseFilter = `, coursesFilter);
    const courseId = coursesFilter.map(id => id.course_id);
    // console.log(`courseID = `, courseId);
    window.location = "http://localhost:3001/courses/" + courseId;
  };
  render() {
    // console.log(`Props = `, this.props);
    return (
      <div>
        <select onChange={event => this.setCourses(event)}>
          {this.state.courses.map(course => (
            <option key={course.course_id}>{course.course_title}</option>
          ))}
          <option>Please Select Your Course </option>
        </select>
      </div>
    );
  }
}

export default Courses;
