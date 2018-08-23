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
export const getOrganisations = () => {
  return instance.get("/api/organisations").then(res => res.data);
};
export const updateOrganisations = () => {
  return instance.put("/api/organisations").then(res => res.data);
};
