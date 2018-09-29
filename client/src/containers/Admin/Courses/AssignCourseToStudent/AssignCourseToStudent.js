import React, { Component } from "react";
import {
  getCourseById,
  getStudentsByCourseId,
  getStudents,
  assignUserToCourse
} from "../../../../helpers/api";

class AssignCourseToStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      students: [],
      allStudents: [],
      course_id: "",
      user_id: "",
      message: "",
      messageAlert: ""
    };
  }

  setStudent = e => {
    const studentId = e.target.value;
    this.setState({ user_id: studentId });
  };

  loadStudents = async () => {
    const courseId = this.props.match.params.courseId;
    const allStudentsData = await getStudents();
    const studentsData = await getStudentsByCourseId(courseId);
    this.setState({
      students: studentsData.data,
      allStudents: allStudentsData.data
    });
  };

  componentDidMount = async () => {
    const courseId = this.props.match.params.courseId;
    const res = await getCourseById(courseId);
    const { name } = res.data[0];
    this.loadStudents();

    this.setState({
      name,
      course_id: courseId
    });
  };

  onSubmit = async e => {
    e.preventDefault();
    const { course_id, user_id } = this.state;
    let user = this.state.students.map(s => s.userId).includes(Number(user_id));

    if (course_id === "" || user_id === "" || user !== false) {
      this.setState({
        message:
          user !== false
            ? "This student has been already assigned to this course."
            : "You must select a student!",
        messageAlert: "alert alert-danger"
      });
    } else {
      try {
        const res = await assignUserToCourse(course_id, user_id);
        this.setState({
          message: res.data,
          messageAlert: "alert alert-success"
        });
        this.loadStudents();
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
            <h2 className="page-header">Course: {this.state.name}</h2>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-8">
            {this.state.students.length} students are assigned to this course.
          </div>
        </div>
        <br />
        {this.state.message && (
          <div className={this.state.messageAlert}>{this.state.message}</div>
        )}
        <div className="row">
          <div className="col-lg-6">
            <form className="form-inline">
              <div className="form-group">
                <label className="control-label">Assign a new student:</label>
                <select
                  className="form-control"
                  onChange={e => this.setStudent(e)}
                >
                  <option>Select</option>
                  {this.state.allStudents.map((student, i) => (
                    <option key={i} value={student.userId}>
                      {student.studentName}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                onClick={e => this.onSubmit(e)}
              >
                Save
              </button>
            </form>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-8">
            <div className="table-responsive">
              <table className="table table-striped table-bordered table-hover">
                <thead>
                  <tr>
                    <th>User Name</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.students.map((student, i) => (
                    <tr key={i}>
                      <td>{student.userName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AssignCourseToStudent;
