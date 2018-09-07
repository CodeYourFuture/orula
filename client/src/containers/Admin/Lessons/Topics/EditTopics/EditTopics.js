import React, { Component } from "react";
import { updateTopics, getTopicById } from "../../../../../helpers/api";

class EditTopics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topic_id: this.props.match.params.topicId,
      name: "",
      message: "",
      messageAlert: ""
    };
  }

  componentDidMount = async () => {
    const topic_id = this.props.match.params.topicId;
    const topic = await getTopicById(topic_id);
    const { title } = topic.data[0];
    this.setState({ topic_id, name: title });
  };

  onHandleChange = (input, e) => {
    const value = e.target.value;
    console.log(`value= `, value);
    this.setState({ [input]: value });
  };

  goBachToTopicId = () => {
    this.props.history.goBack();
  };

  // put it to /api/topics
  onSave = async (input, e) => {
    e.preventDefault();
    const { name, topic_id } = this.state;
    if (name === "") {
      this.setState({
        message: "The Name field is empty!",
        messageAlert: "alert alert-danger"
      });
    } else {
      try {
        await updateTopics(topic_id, name);

        this.setState({
          message: "Topic has been successfully updated!",
          messageAlert: "alert alert-success"
        });
      } catch (err) {
        this.setState({
          message: [err.response.data],
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
            <h2 className="page-header">Edit Topics</h2>
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
                          Name
                        </label>
                        {console.log(`Editpage params= `, this.props)}

                        <input
                          className="form-control"
                          type="text"
                          id="name"
                          onChange={e => this.onHandleChange("name", e)}
                          value={this.state.name}
                        />
                      </div>
                      <button
                        type="save"
                        className="btn btn-primary"
                        onClick={e => this.onSave("name", e)}
                        value={this.state.name}
                      >
                        <i className="fa fa-save fa-fw" />
                        Save
                      </button>
                    </form>
                    <hr />
                    <div className="row col-lg-2 ">
                      <button
                        type="save"
                        className="btn btn-primary"
                        onClick={this.goBachToTopicId}
                      >
                        <i className="fa fa-eye fa-fw" />
                        View all topics
                      </button>
                    </div>
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

export default EditTopics;
