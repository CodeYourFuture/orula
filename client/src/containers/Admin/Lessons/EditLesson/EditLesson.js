import React from "react";
import { editLesson, getLessonsById } from "../../../../helpers/api";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import "./EditLesson.css";

class EditLesson extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lesson_id: "",
      course_id: "",
      name: "",
      lesson_date: "",
      message: "",
      messageAlert: ""
    };
  }

  componentDidMount = async () => {
    const lesson_id = this.props.match.params.lessonId;
    const lesson = await getLessonsById(lesson_id);
    const { name, lesson_date, course_id } = lesson.data[0];
    this.setState({
      lesson_id,
      course_id,
      name,
      lesson_date
    });
  };

  handleDateChange = lesson_date => {
    this.setState({
      lesson_date: new Date(lesson_date)
    });
  };

  handleOnchange = (input, e) => {
    const value = e.target.value;
    this.setState({ [input]: value });
  };

  // put it to /api/lessons/:id
  onSubmit = async e => {
    e.preventDefault();
    const { lesson_id, name, lesson_date, course_id } = this.state;
    if (name === "" || lesson_date === "" || course_id === "") {
      this.setState({
        message: "You must fill all the fields!",
        messageAlert: "alert alert-danger"
      });
    } else {
      try {
        const res = await editLesson(lesson_id, name, lesson_date, course_id);
        this.setState({
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
            <h2 className="page-header">Edit Lesson</h2>
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
                          Pick Date (DD/MM/YYYY)
                        </label>

                        <DatePicker
                          selected={moment(this.state.lesson_date)}
                          onChange={this.handleDateChange}
                        />
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
              </div>
            </div>
            {this.state.message && (
              <div className={this.state.messageAlert}>
                {this.state.message}
              </div>
            )}
          </div>
          <div className="col-lg-12">
            <Link to="/admin/lessons">
              <button className="btn btn-primary">
                <i className="fa fa-eye fa-fw" /> View all lessons
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default EditLesson;
