import axios from "axios";
const API_URL = process.env.REACT_APP_API_URI || "http://localhost:4000";

const instance = axios.create({
  baseURL: API_URL
});

export const getStatus = () => {
  return instance.get("/api/status").then(res => res.json());
};

export const getStudents = () => {
  // To Do
};
