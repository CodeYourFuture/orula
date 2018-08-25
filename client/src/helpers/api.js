import axios from "axios";

const instance = axios.create({
  baseURL: "/"
});

export const getStatus = () => {
  return instance.get("/api/status").then(res => res.data);
};

export const getCourses = () => {
  return instance.get("/api/courses");
};

export const getCourseById = async course_id => {
  return await instance.get(`/api/courses/${course_id}`);
};

// Add Course
export const addCourse = async (name, location, organisation_id) => {
  return await instance.post("/api/courses", {
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
  return await instance.put(`/api/courses/${course_id}`, {
    name,
    location,
    organisation_id
  });
};

export const getStudents = () => {
  // To Do
};

export const getOrganisations = async () => {
  return await instance.get("/api/organisations").then(res => res.data);
};

export const getOrganisationsById = async organisation_id => {
  return await instance.get("/api/organisations", {
    params: { organisation_id }
  });
};

export const addOrganisation = async name => {
  return await instance.post("/api/organisations", { name });
};

// Login user with local storage caching of jwt token after login
export const loginUser = async (email, password) => {
  const { data } = await instance.post("/auth/login", { email, password });
  // save token to the local storage
  localStorage.setItem("jwtToken", data.token);
  axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
  // return the token
  return data.token;
};

export const getUserProfile = () => {
  return instance.get("/user/profile");
};
export const updateOrganisations = async (organisation_id, name) => {
  return await instance.put("/api/organisations/" + organisation_id, {
    organisation_id,
    name
  });
};

export const deleteOrganisation = organisation_id => {
  return instance.delete("/api/organisations/" + organisation_id);
};

export const getLessons = id => {
  return instance.get("/api/courses/" + id);
};
