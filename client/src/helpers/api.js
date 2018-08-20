import axios from "axios";
const API_URL = process.env.REACT_APP_API_URI || "/";

const instance = axios.create({
  baseURL: API_URL
});

export const getStatus = () => {
  return instance.get("/api/status").then(res => res.data);
};
export const getCourses = () => {
  return instance.get("/api/courses");
};

export const getStudents = () => {
  // To Do
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
