import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "../../components/Home/Home";
import Help from "../../components/Help/Help";
import MyProfile from "../../components/MyProfile/MyProfile";
import "./App.css";
import Dashboard from "../../components/Dashboard/Dashboard";
import Courses from "../Admin/Courses/Courses";
import AddOrganisation from "../Admin/AddOrganisation/AddOrganisation";
import AddCourse from "../Admin/Courses/AddCourse/AddCourse";
import EditCourse from "../Admin/Courses/EditCourse/EditCourse";
import Nav from "../../components/Nav/Nav";
import Organisations from "../Admin/Organisations/Organisations";
import axios from "axios";
import UpdateOrganisation from "../Admin/Organisations/Edit/UpdateOrganisation";
import Lessons from "../Admin/Lessons/Lessons";
import AddLesson from "../Admin/Lessons/AddLesson/AddLesson";
import EditLesson from "../Admin/Lessons/EditLesson/EditLesson";
import ViewTopics from "../Admin/Lessons/Topics/ViewTopics";
import AddTopics from "../Admin/Lessons/Topics/AddTopics/AddTopics";
import EditTopics from "../Admin/Lessons/Topics/EditTopics/EditTopics";
import Users from "../Admin/Users/Users";
import AssignUserRole from "../Admin/Users/AssignUserRole";
import EditUser from "../User/EditUser/EditUser";
import { isAdminLoggedIn } from "../../helpers/api.js";
import IsntAdmin from "../Admin/IsntAdmin/IsntAdmin";
import AssignCourseToStudent from "../Admin/Courses/AssignCourseToStudent/AssignCourseToStudent";
import ViewStudentTopics from "../User/Topics/ViewStudentTopics";

class App extends Component {
  state = { admin: null };
  componentDidMount = async () => {
    // get token from local storage
    const token = localStorage.getItem("jwtToken");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    // if there is no token redirect to login page
    if (!token) {
      return this.props.history.push("/login");
    }
    this.setState({ admin: isAdminLoggedIn() });
  };

  render() {
    const token = localStorage.getItem("jwtToken");
    if (!token) return null;
    return (
      <Router>
        <div id="wrapper">
          <Nav />
          <div id="page-wrapper">
            <Route exact path="/" component={Home} />
            <Route exact path="/my-profile" component={MyProfile} />
            <Route exact path="/help" component={Help} />
            
            {this.state.admin ? (<Route exact path="/dashboard" component={Dashboard} />) : 
            (<Route exact path="/dashboard" component={IsntAdmin} />)}
            
            {this.state.admin ? (<Route exact path="/admin/courses" component={Courses} />) : 
            (<Route exact path="/admin/courses" component={IsntAdmin} />)}
           
            {this.state.admin ? (
              <Route
                exact
                path="/admin/organisations"
                component={Organisations}
              />
            ) : (
              <Route exact path="/admin/organisations" component={IsntAdmin} />
            )}
            {this.state.admin ? (
              <Route
                path="/admin/organisations/add"
                component={AddOrganisation}
              />
            ) : (
              <Route path="/admin/organisations/add" component={IsntAdmin} />
            )}
            {this.state.admin ? (
              <Route exact path="/admin/courses/add" component={AddCourse} />
            ) : (
              <Route exact path="/admin/courses/add" component={IsntAdmin} />
            )}
            {this.state.admin ? (
              <Route
                path="/admin/organisation/edit/:organisation_id"
                component={UpdateOrganisation}
              />
            ) : (
              <Route
                path="/admin/organisation/edit/:organisation_id"
                component={IsntAdmin}
              />
            )}
            {this.state.admin ? (
              <Route
                exact
                path="/admin/courses/edit/:courseId"
                component={EditCourse}
              />
            ) : (
              <Route
                exact
                path="/admin/courses/edit/:courseId"
                component={IsntAdmin}
              />
            )}
            {this.state.admin ? (
              <Route exact path="/admin/lessons" component={Lessons} />
            ) : (
              <Route exact path="/admin/lessons" component={IsntAdmin} />
            )}
            {this.state.admin ? (
              <Route exact path="/admin/lessons/add" component={AddLesson} />
            ) : (
              <Route exact path="/admin/lessons/add" component={IsntAdmin} />
            )}
            {this.state.admin ? (
              <Route
                exact
                path="/admin/lessons/edit/:lessonId"
                component={EditLesson}
              />
            ) : (
              <Route
                exact
                path="/admin/lessons/edit/:lessonId"
                component={IsntAdmin}
              />
            )}
            {this.state.admin ? (
              <Route
                exact
                path="/admin/lessons/:lessonId/topics"
                component={ViewTopics}
              />
            ) : (
              <Route
                exact
                path="/admin/lessons/:lessonId/topics"
                component={IsntAdmin}
              />
            )}
            {this.state.admin ? (
              <Route path="/admin/topics/add" component={AddTopics} />
            ) : (
              <Route path="/admin/topics/add" component={IsntAdmin} />
            )}
            {this.state.admin ? (
              <Route
                path="/admin/topics/edit/:topicId"
                component={EditTopics}
              />
            ) : (
              <Route path="/admin/topics/edit/:topicId" component={IsntAdmin} />
            )}
            {this.state.admin ? (
              <Route exact path="/admin/users" component={Users} />
            ) : (
              <Route exact path="/admin/users" component={IsntAdmin} />
            )}
            {this.state.admin ? (
              <Route
                path="/admin/users/assign-role/:userId"
                component={AssignUserRole}
              />
            ) : (
              <Route
                path="/admin/users/assign-role/:userId"
                component={IsntAdmin}
              />
            )}
            <Route
              exact
              path="/lesson/:lessonId"
              component={ViewStudentTopics}
            />
            <Route path="/user/profile/edit" component={EditUser} />
            {this.state.admin ? (
              <Route
                exact
                path="/admin/courses/:courseId"
                component={AssignCourseToStudent}
              />
            ) : (
              <Route
                exact
                path="/admin/courses/:courseId"
                component={IsntAdmin}
              />
            )}
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
