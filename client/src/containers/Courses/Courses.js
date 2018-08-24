import React, { Component } from "react";
import { getCourses, getOrganisationsById } from "../../helpers/api";
import { Link } from "react-router-dom";

class Courses extends Component {
  state = {
    courses: [],
    organisations: []
  };

  componentDidMount = async () => {
    const res = await getCourses();
    const courses = res.data;
    const organisations = [];
    courses.map(course => {
      return this.getOrganisationName(course.course_id).then(name =>
        organisations.push(name)
      );
    });
    this.setState({ courses, organisations });
  };

  getOrganisationName = async id => {
    const res = await getOrganisationsById(id);
    const data = res.data[0];
    return data.name;
  };

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-lg-12">
            <h2 className="page-header">Courses</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8">
            <div className="table-responsive">
              <table className="table table-striped table-bordered table-hover">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Course Name</th>
                    <th>Location</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.courses.map(course => (
                    <tr key={course.course_id}>
                      <td>{course.course_id}</td>
                      <td>{course.name}</td>
                      <td>{course.location}</td>
                      <td>
                        <Link
                          to={{
                            pathname: `/admin/courses/edit/${course.course_id}`,
                            state: { 
                              name: course.name, 
                              location: course.location,
                              organisation_id: course.organisation_id
                            }
                          }}
                        >
                          <button className="btn btn-success">Edit</button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Link to="/admin/courses/add">
              <button className="btn btn-primary">
                <i className="fa fa-plus fa-fw" /> Add Course
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Courses;
