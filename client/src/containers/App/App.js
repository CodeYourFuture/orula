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
import { getSessionUser, getUserRoles } from "../../helpers/api.js";
import IsntAdmin from "../Admin/IsntAdmin/IsntAdmin";
import AssignCourseToStudent from "../Admin/Courses/AssignCourseToStudent/AssignCourseToStudent";
import TopicsHome from "../User/Topics/TopicsHome";
import StudentProfile from "../../components/MyProfile/StudentProfile";

class App extends Component {
  state = { admin: false };
  componentDidMount = async () => {
    // get token from local storage
    const token = localStorage.getItem("jwtToken");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    // if there is no token redirect to login page
    if (!token) {
      return this.props.history.push("/login");
    }
    const userData = await getSessionUser();
    const { data: roles } = await getUserRoles(userData.user_id);
    const userRoles = roles.map(role => role.role);
    if (userRoles.includes("Admin")) {
      this.setState({ admin: true });    }
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
            {this.state.admin ? ([
            <Route key={1} exact path="/dashboard" component={Dashboard} />,
            <Route key={2} exact path="/admin/courses" component={Courses} />,
            <Route key={3} exact path="/admin/organisations" component={Organisations}/>,
            <Route key={4} path="/admin/organisations/add" component={AddOrganisation}/>,
            <Route key={5} exact path="/admin/courses/add" component={AddCourse} />,
            <Route key={6} path="/admin/organisation/edit/:organisation_id" component={UpdateOrganisation}/>,
            <Route key={7} exact path="/admin/courses/edit/:courseId" component={EditCourse}/>,
            <Route key={8} exact path="/admin/lessons" component={Lessons} />,
            <Route key={9} exact path="/admin/lessons/add" component={AddLesson} />,
            <Route key={10} exact path="/admin/lessons/edit/:lessonId" component={EditLesson}/>,
            <Route key={11} exact path="/admin/lessons/:lessonId/topics" component={ViewTopics}/>,
            <Route key={12} path="/admin/topics/add" component={AddTopics} />,
            <Route key={13} path="/admin/topics/edit/:topicId" component={EditTopics} />,
            <Route key={14} exact path="/admin/users" component={Users} />,
            <Route key={15} path="/admin/users/assign-role/:userId" component={AssignUserRole}/>,
            <Route key={16} exact path="/admin/courses/:courseId" component={AssignCourseToStudent}/>
            ]) : ([
              <Route key={1} exact path="/dashboard" component={IsntAdmin} />,
              <Route key={2} exact path="/admin/courses" component={IsntAdmin} />,
              <Route key={3} exact path="/admin/organisations" component={IsntAdmin}/>,
              <Route key={4} path="/admin/organisations/add" component={IsntAdmin}/>,
              <Route key={5} exact path="/admin/courses/add" component={IsntAdmin} />,
              <Route key={6} path="/admin/organisation/edit/:organisation_id" component={IsntAdmin}/>,
              <Route key={7} exact path="/admin/courses/edit/:courseId" component={ IsntAdmin }/>,
              <Route key={8} exact path="/admin/lessons" component={IsntAdmin} />,
              <Route key={9} exact path="/admin/lessons/add" component={IsntAdmin} />,
              <Route key={10} exact path="/admin/lessons/edit/:lessonId" component={IsntAdmin}/>,
              <Route key={11} exact path="/admin/lessons/:lessonId/topics" component={IsntAdmin}/>,
              <Route key={12} path="/admin/topics/add" component={IsntAdmin} />,
              <Route key={13} path="/admin/topics/edit/:topicId" component={IsntAdmin} />,
              <Route key={14} exact path="/admin/users" component={IsntAdmin} />,
              <Route key={15} path="/admin/users/assign-role/:userId" component={IsntAdmin}/>,
              <Route key={16} exact path="/admin/courses/:courseId" component={IsntAdmin}/>
              ])}
            <Route exact path="/lesson/:lessonId" component={TopicsHome} />
            <Route path="/user/profile/edit" component={EditUser} />
            <Route path="/student-profile/:userId" component={StudentProfile} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
