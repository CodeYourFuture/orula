import React, { Component } from "react";
import {
  getSessionUser,
  getCoursesByUser,
  getLessons,
  getStudentsByCourseId
} from "../../helpers/api";
import { Link } from "react-router-dom";

class MentorHome extends Component {
  state = {
    courses: [],
    lessons: [],
    students: [],
    userName: ""
  };

  async componentDidMount() {
    getLessons().then(data => {
      this.setState({ lessons: data });
    });
    const userData = await getSessionUser();
    const { data: courses } = await getCoursesByUser(userData.user_id);
    const courseId = courses.map(course => course.courseId);
    const studentsData = await getStudentsByCourseId(courseId);
    this.setState({ courses, students: studentsData.data });
  }

  render() {
    return (
      <div className="row">
        {this.state.courses.map(course => (
          <div key={course.courseId}>
            <h2 className="page-header">{course.courseName}</h2>
            <div className="row">
              <div className="col-lg-8">
                {this.state.students.length} students are assigned to this
                course:{" "}
                {this.state.students.map(user => user.userName).join(", ")}
              </div>
            </div>
            <br />
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Lessons</th>
                </tr>
              </thead>
              <tbody>
                {this.state.lessons
                  .filter(lesson => lesson.course_title === course.courseName)
                  .map(lesson => (
                    <tr key={lesson.lesson_id}>
                      <td>
                        <Link to={`/lesson/${lesson.lesson_id}`}>
                          {lesson.name}
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    );
  }
}

export default MentorHome;
