import axios from "axios";

const createInstance = () => {
  const token = localStorage.getItem("jwtToken");
  return axios.create({
    baseURL: "/",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const getStatus = () => {
  return createInstance()
    .get("/api/status")
    .then(res => res.data);
};

// Get all Courses
export const getCourses = () => {
  return createInstance().get("/api/courses");
};

export const getCourseById = async course_id => {
  return await createInstance().get(`/api/courses/${course_id}`);
};

// Add Course
export const addCourse = async (name, location, organisation_id) => {
  return await createInstance().post("/api/courses", {
    name,
    location,
    organisation_id
  });
};

// Edit Course
export const editCourse = async (
  course_id,
  name,
  location,
  organisation_id
) => {
  return await createInstance().put(`/api/courses/${course_id}`, {
    name,
    location,
    organisation_id
  });
};

// Delete Course
export const deleteCourse = async course_id => {
  return await createInstance().delete(`api/courses/${course_id}`);
};

export const getStudents = async () => {
  return await createInstance().get(`api/students`);
};

export const getStudentRatingsByTopic = async topic_id => {
  return await createInstance().get(`api/student-ratings/${topic_id}`);
};

export const getOrganisations = async () => {
  return await createInstance()
    .get("/api/organisations")
    .then(res => res.data);
};

export const getOrganisationsById = async organisation_id => {
  return await createInstance().get(`/api/organisations/${organisation_id}`);
};

export const addOrganisation = async name => {
  return await createInstance().post("/api/organisations", { name });
};

// Login user with local storage caching of jwt token after login
export const loginUser = async (email, password) => {
  const { data } = await createInstance().post("/auth/login", {
    email,
    password
  });
  // save token to the local storage
  localStorage.setItem("jwtToken", data.token);
  // axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
  // return the token
  return data.token;
};

export const getSessionUser = async () => {
  const token = localStorage.getItem("jwtToken");
  return await createInstance()
    .get("/user/profile", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => res.data);
};

export const getUsersByRole = async () => {
  return await createInstance().get("/api/user-roles");
};

export const getUserRoles = async user_id => {
  return await createInstance().get(`/api/user-roles/${user_id}`, { user_id });
};

export const addRoleToUser = async (user_id, roles) => {
  return await createInstance().post("/api/user-roles", {
    user_id,
    roles
  });
};

export const getRoles = async () => {
  return await createInstance().get("/api/roles");
};

export const updateOrganisations = async (organisation_id, name) => {
  return await createInstance().put(`/api/organisations/${organisation_id}`, {
    organisation_id,
    name
  });
};

export const deleteOrganisation = organisation_id => {
  return createInstance().delete("/api/organisations/" + organisation_id);
};

export const getLessons = () => {
  return createInstance()
    .get("/api/lessons")
    .then(res => res.data);
};

export const getLessonsById = async lesson_id => {
  return await createInstance().get(`/api/lessons/${lesson_id}`);
};

export const deleteLesson = async lesson_id => {
  return await createInstance().delete("/api/lessons/" + lesson_id);
};

export const addLesson = async (name, lesson_date, course_id) => {
  return await createInstance().post("/api/lessons", {
    name,
    lesson_date,
    course_id
  });
};

// Edit Lesson
export const editLesson = async (lesson_id, name, lesson_date, course_id) => {
  return await createInstance().put(`/api/lessons/${lesson_id}`, {
    name,
    lesson_date,
    course_id
  });
};

export const getTopicsByLessonId = async lessonId => {
  return await createInstance().get(`/api/topics?lessonId=${lessonId}`);
};

export const deleteTopic = async topic_id => {
  return await createInstance().delete(`/api/topics/${topic_id}`);
};

export const addTopic = async (title, lesson_id) => {
  return await createInstance().post("/api/topics", { title, lesson_id });
};

export const updateTopics = async (topic_id, title) => {
  return await createInstance().put(`/api/topics/${topic_id}`, {
    topic_id,
    title
  });
};

export const getTopicById = async topic_id => {
  return await createInstance().get(`/api/topics/${topic_id}`);
};

// Add User
export const addUser = async (name, email, password) => {
  return await createInstance().post("/api/users", {
    name,
    email,
    password
  });
};

//Edit User
export const updateUserProfile = async (name, email) => {
  const token = localStorage.getItem("jwtToken");

  return await createInstance().put(`/user/profile`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    name,
    email
  });
};

export const getStudentsByCourseId = async course_id => {
  return await createInstance().get(`api/courses/${course_id}/students`);
};

export const assignUserToCourse = async (course_id, user_id) => {
  return await createInstance().post("/api/enrol", { course_id, user_id });
};
export const getCoursesByUser = async userId => {
  return await createInstance().get(`/api/user-courses/${userId}`);
};

export const getRatings = async lesson_id => {
  return await createInstance().get(`/api/ratings/${lesson_id}`);
};

export const addRatings = async (lessonId, ratings) => {
  return await createInstance().post(`/api/ratings/${lessonId}`, {
    ratings
  });
};
