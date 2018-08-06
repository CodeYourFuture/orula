import axios from "axios";
const API_URL = process.env.REACT_APP_API_URI || "http://localhost:4000";

export const getStatus = () => {
  return axios.get(`${API_URL}/api/status`).then(res => res.json());
};

export const getStudents = () => {
  // To Do
};
