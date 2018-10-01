import React, { Component } from "react";
import {
  getTopicsByLessonId,
  getLessonsById,
  getRatings,
  addRatings
} from "../../../helpers/api";
import { Link } from "react-router-dom";
import RatingsSelect from "../../../components/User/RatingsSelect";

class ViewStudentTopics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: [],
      lessonName: "",
      ratings: [],
      message: "",
      messageAlert: ""
    };
  }

  generateInitialRatings = topics => {
    const ratings = topics.map(topic => {
      return {
        topic_id: topic.topic_id,
        title: topic.title,
        rating_before: -1,
        rating_after: -1,
        rating_3days: -1,
        rating_1week: -1
      };
    });
    return ratings;
  };

  componentDidMount = async () => {
    const lessonId = this.props.lessonId;
    const { data: topics } = await getTopicsByLessonId(lessonId);
    const { data: lesson } = await getLessonsById(lessonId);
    this.setState({ topics, lessonName: lesson[0].name });
    const { data: ratings } = await getRatings(lessonId);
    if (ratings.length === 0) {
      const newRatings = this.generateInitialRatings(topics);
      this.setState({ ratings: newRatings });
    } else {
      this.setState({ ratings });
    }
  };

  setRating = (topic_id, column, e) => {
    const value = e.target.value;
    this.setState(({ ratings: prevRatings }) => {
      const newRatings = [...prevRatings];
      const ratingIndex = newRatings.findIndex(rating => {
        return rating.topic_id === topic_id;
      });
      newRatings[ratingIndex][column] = value;
      return {
        ratings: newRatings
      };
    });
  };

  onSave = async e => {
    e.preventDefault();

    const ratings = this.state.ratings;
    try {
      const lessonId = this.props.lessonId;
      const { data } = await addRatings(lessonId, ratings);
      this.setState({
        message: "Successfully saved ratings!",
        messageAlert: "alert alert-success",
        ratings: data
      });
    } catch (err) {
      this.setState({
        message: err.response.data,
        messageAlert: "alert alert-danger"
      });
    }
  };

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-lg-12">
            <h2 className="page-header">{this.state.lessonName}</h2>
          </div>
        </div>
        {this.state.message && (
          <div className={this.state.messageAlert}>{this.state.message}</div>
        )}
        <div className="row">
          <div className="col-md-12">
            <div className="table-responsive">
              <table className="table table-striped table-bordered table-hover">
                <thead>
                  <tr>
                    <th>Topic name</th>
                    <th>Rating before the class</th>
                    <th>Rating after the class</th>
                    <th>Rating 3 days later</th>
                    <th>Rating 1 week later</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.ratings.map((rating, index) => (
                    <tr key={index}>
                      <td>{rating.title}</td>
                      <td>
                        <RatingsSelect
                          onChange={e =>
                            this.setRating(rating.topic_id, "rating_before", e)
                          }
                          rating={rating.rating_before}
                          group="rating_before"
                        />
                      </td>
                      <td>
                        <RatingsSelect
                          onChange={e =>
                            this.setRating(rating.topic_id, "rating_after", e)
                          }
                          rating={rating.rating_after}
                          group="rating_after"
                        />
                      </td>
                      <td>
                        <RatingsSelect
                          onChange={e =>
                            this.setRating(rating.topic_id, "rating_3days", e)
                          }
                          rating={rating.rating_3days}
                          group="rating_3days"
                        />
                      </td>
                      <td>
                        <RatingsSelect
                          onChange={e =>
                            this.setRating(rating.topic_id, "rating_1week", e)
                          }
                          rating={rating.rating_1week}
                          group="rating_1week"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button className="btn btn-success" onClick={this.onSave}>
              Save Ratings
            </button>{" "}
            <Link to="/">
              <button className="btn btn-info">Go back</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewStudentTopics;
