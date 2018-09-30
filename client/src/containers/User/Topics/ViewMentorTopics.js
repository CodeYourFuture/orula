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
    topics.map(async topic => {
      const { data: rating } = await getStudentRatingsByTopic(topic.topic_id);
      Array.prototype.push.apply(ratings, rating);
    });
    this.setState({ ratings, topics, lessonName: lesson[0].name });
  };

  render() {
    const { ratings, topics, lessonName } = this.state;
    console.log(ratings)
    return (
      <div>
        <div className="row">
          <div className="col-lg-12">
            <h2 className="page-header">{lessonName}</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            {topics.map(topic => (
              <div key={topic.topic_id} className="table-responsive">
                <h4>{topic.title}</h4>
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
                    {ratings.forEach(rating => {
                      console.log(rating)(
                        <tr>
                          <td>{rating.name}</td>
                          <td />
                          <td />
                          <td />
                          <td />
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ))}
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
