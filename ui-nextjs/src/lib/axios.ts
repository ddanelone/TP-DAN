import axios from "axios";

const api = axios.create({
  //baseURL: "http://localhost:8080/api",
  baseURL: "http://localhost/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
