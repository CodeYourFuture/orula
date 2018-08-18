import axios from "axios";
const API_URL = process.env.REACT_APP_API_URI || "/";

const instance = axios.create({
  baseURL: API_URL
});

export const getStatus = () => {
  return instance.get("/api/status").then(res => res);
};

export const getStudents = () => {
  // To Do
};
