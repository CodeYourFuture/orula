import React, { Component } from "react";
import { getCourses } from "../../helpers/api";
class Courses extends Component {
  state = {
    courses: []
  };
  componentDidMount() {
    getCourses().then(data => {
      this.setState({ courses: JSON.stringify(data) });
    });
  }

  render() {
    return (
      <div>
        <p>Courses table</p>
        {/* <table>
          <thead>
            <tr>
              <th>organisationName</th>
              <th>courseTitle</th>
              <th>lessonName</th>
              <th>location</th>
            </tr>
          </thead>
          <tbody>
            {console.log(this.state.courses)}
            {this.state.courses.map(result => (
              <tr key="1">
                <td>{result.organisationName}</td>
                <td>{result.courseTitle}</td>
                <td>{result.lessonName}</td>
                <td>{result.location}</td>
              </tr>
            ))}
          </tbody>
        </table> */}
        <p>{this.state.courses}</p>
      </div>
    );
  }
}

export default Courses;
