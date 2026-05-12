import axios from "axios";

const axiosAPI = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

axiosAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosAPI;