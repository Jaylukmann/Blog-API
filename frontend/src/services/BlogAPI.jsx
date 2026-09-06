import axios from "axios";

const BlogAPI = axios.create({
  baseURL: "http://localhost:5050",
});

BlogAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default BlogAPI;