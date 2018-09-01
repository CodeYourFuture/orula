import React from "react";
import { addLesson, getCourses } from "../../../../helpers/api";

class AddLesson extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      lesson_date: "",
      course_id: "",
      courses: [],
      message: "",
      messageAlert: ""
    };
  }

  componentDidMount = async () => {
    const res = await getCourses();
    const data = res.data;
    this.setState({ courses: data });
  };

  handleOnchange = (input, e) => {
    const value = e.target.value;
    this.setState({ [input]: value });
  };

  setcourse = e => {
    const courseName = e.target.value;
    const course = this.state.courses.find(
      course => course.name === courseName
    );
    // check if course is selected then set state
    if (course) {
      this.setState({ course_id: course.course_id });
    } else {
      this.setState({ course_id: "" });
    }
  };

  // post it to /api/course
  onSubmit = async e => {
    e.preventDefault();
    const { name, lesson_date, course_id } = this.state;
    if (name === "" || lesson_date === "" || course_id === "") {
      this.setState({
        message: "You must fill all the fields!",
        messageAlert: "alert alert-danger"
      });
    } else {
      try {
        const res = await addLesson(name, lesson_date, course_id);
        this.setState({
          name: "",
          lesson_date: "",
          message: res.data,
          messageAlert: "alert alert-success"
        });
      } catch (err) {
        this.setState({
          message: err.response.data,
          messageAlert: "alert alert-danger"
        });
      }
    }
  };

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-lg-12">
            <h2 className="page-header">Add Lesson</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="panel panel-default">
              <div className="panel-heading">Lesson details</div>
              <div className="panel-body">
                <div className="row">
                  <div className="col-lg-6">
                    <form>
                      <div className="form-group">
                        <label className="control-label" htmlFor="name">
                          Name
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="name"
                          id="name"
                          onChange={e => this.handleOnchange("name", e)}
                          value={this.state.name}
                        />
                      </div>
                      <div className="form-group">
                        <label className="control-label" htmlFor="lesson_date">
                          Lesson Date (YYYY-MM-DD)
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="lesson_date"
                          id="lesson_date"
                          onChange={e => this.handleOnchange("lesson_date", e)}
                          value={this.state.lesson_date}
                        />
                      </div>
                      <div className="form-group">
                        <label className="control-label" htmlFor="course_id">
                          Course
                        </label>
                        <select
                          className="form-control"
                          name="course_id"
                          id="course_id"
                          onChange={e => this.setcourse(e)}
                        >
                          <option>Select</option>
                          {this.state.courses.map(course => (
                            <option key={course.course_id}>
                              {course.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={e => this.onSubmit(e)}
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            {this.state.message && (
              <div className={this.state.messageAlert}>
                {this.state.message}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default AddLesson;
