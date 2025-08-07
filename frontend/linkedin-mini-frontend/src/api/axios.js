import axios from "axios";

const instance = axios.create({
  baseURL: "https://mini-linkedin-1-jy1p.onrender.com", // change to Render URL when deployed
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;
