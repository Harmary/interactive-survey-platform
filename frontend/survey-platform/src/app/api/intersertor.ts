import axios from "axios";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  function (config) {
    config.url = `http://localhost:3000${config.url}`;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;
