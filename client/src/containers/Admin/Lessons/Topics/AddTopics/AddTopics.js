import React from "react";
import { addTopic } from "../../../../../helpers/api";

class AddTopics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      message: "",
      messageAlert: ""
    };
  }

  handleOnchange = e => {
    const title = e.target.value;
    this.setState({ title });
  };

  // post it to /api/topic
  onSubmit = async e => {
    e.preventDefault();
    const title = this.state.title;
    if (title === "") {
      this.setState({
        message: "You must provide a title!",
        messageAlert: "alert alert-danger"
      });
    } else {
      try {
        console.log(this.props.location.search.replace("?lessonId=", ""));
        const lessonId = this.props.location.search.replace("?lessonId=", "");
        await addTopic(title, lessonId);

        this.setState({
          title: "",
          message: "Topic has been successfully added!",
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
            <h2 className="page-header">Add Topics</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="panel panel-default">
              <div className="panel-heading">Topics details</div>
              <div className="panel-body">
                <div className="row">
                  <div className="col-lg-6">
                    <form>
                      <div className="form-group">
                        <label className="control-label" htmlFor="name">
                          Title
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="name"
                          id="name"
                          onChange={e => this.handleOnchange(e)}
                          value={this.state.name}
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={e => this.onSubmit(e)}
                      >
                        Add
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

export default AddTopics;
