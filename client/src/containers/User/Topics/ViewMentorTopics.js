import React, { Component } from "react";
import {
  getTopicsByLessonId,
  getLessonsById,
  getStudentRatingsByTopic
} from "../../../helpers/api";
import { Link } from "react-router-dom";

class ViewMentorTopics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: [],
      lessonName: "",
      ratings: []
    };
  }

  componentDidMount = async () => {
    const lessonId = this.props.lessonId;
    const { data: topics } = await getTopicsByLessonId(lessonId);
    const { data: lesson } = await getLessonsById(lessonId);
    var ratings = [];
    topics.forEach(topic => {
      const rating = getStudentRatingsByTopic(topic.topic_id);
      ratings.push(rating);
    });
    const responses = await Promise.all(ratings);
    var newRatings = [];
    responses.forEach(res => {
      const { data } = res;
      newRatings.push(data[0]);
    });
    this.setState({ ratings: newRatings, topics, lessonName: lesson[0].name });
  };

  render() {
    const { ratings, topics, lessonName } = this.state;
    return (
      <div>
        <div className="row">
          <div className="col-lg-12">
            <h2 className="page-header">{lessonName}</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            {topics.length > 0
              ? topics.map(topic => (
                  <div key={topic.topic_id} className="table-responsive">
                    <h4>{topic.title}</h4>
                    {ratings.length > 0 ? (
                      <table className="table table-striped table-bordered table-hover">
                        <thead>
                          <tr>
                            <th>Student name</th>
                            <th>Rating before the class</th>
                            <th>Rating after the class</th>
                            <th>Rating 3 days later</th>
                            <th>Rating 1 week later</th>
                          </tr>
                        </thead>
                        <tbody>
                          {ratings.map(rating => {
                            if (rating === undefined) return null;
                            if (topic.topic_id === rating.topic_id) {
                              return (
                                <tr key={rating.rating_id}>
                                  <td>
                                    <Link
                                      to={`/student-profile/${rating.user_id}`}
                                    >
                                      {rating.name}
                                    </Link>
                                  </td>
                                  <td>
                                    {rating.rating_before === -1
                                      ? "Not rated"
                                      : rating.rating_before}
                                  </td>
                                  <td>
                                    {rating.rating_after === -1
                                      ? "Not rated"
                                      : rating.rating_after}
                                  </td>
                                  <td>
                                    {rating.rating_3days === -1
                                      ? "Not rated"
                                      : rating.rating_3days}
                                  </td>
                                  <td>
                                    {rating.rating_1week === -1
                                      ? "Not rated"
                                      : rating.rating_1week}
                                  </td>
                                </tr>
                              );
                            }
                            return null;
                          })}
                        </tbody>
                      </table>
                    ) : null}
                  </div>
                ))
              : null}
            <Link to="/">
              <button className="btn btn-primary">Go back</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewMentorTopics;
