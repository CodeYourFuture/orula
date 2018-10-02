import React, { Component } from "react";
import {
  getSessionUser,
  getCoursesByUser,
  getLessons
} from "../../helpers/api";
import { Link } from "react-router-dom";
import "./StudentHome.css";

class Home extends Component {
  state = {
    courses: [],
    lessons: []
  };

  async componentDidMount() {
    getLessons().then(data => {
      this.setState({ lessons: data });
    });
    const userData = await getSessionUser();
    const { data: courses } = await getCoursesByUser(userData.user_id);
    this.setState({ courses });
  }

  render() {
    return (
      <div className="row">
        {this.state.courses.map(course => (
          <div key={course.courseId}>
            <h2 className="page-header">{course.courseName}</h2>
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

export default Home;
