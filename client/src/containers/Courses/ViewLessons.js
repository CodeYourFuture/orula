import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { getCourseById } from "../../helpers/api";

class ViewLessons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lessons: []
    };
  }

  componentWillReceiveProps(newProps) {
    getCourseById(newProps.courseId).then(res => {
      const data = res.data;
      this.setState({ lessons: data });
    });
  }
  render(props) {
    return (
      <div>
        <ul className="list-group">
          {this.state.lessons.map(lesson => (
            <li key={lesson.lesson_id} className="list-group-item">
              <a
                href={`/courses/${lesson.course_id}/lessons/${
                  lesson.lesson_id
                }`}
              >
                {lesson.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default withRouter(ViewLessons);
