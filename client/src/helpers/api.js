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
  return await instance.post("/api/organisation", { name });
};
export const getOrganisations = () => {
  return instance.get("/api/organisations").then(res => res.data);
};
