import axios from "axios";

const _BASE_URL = "http://localhost:8080/api/v1/";

const _BYPASS_URL_WITHOUT_AUTH = "authenticate";

const axiosInstance = axios.create({
  baseURL: _BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");
    if (req.url !== _BYPASS_URL_WITHOUT_AUTH) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (res) => {
    if (res.status >= 200 && res.status < 300) {
      return res;
    } else if (res.status === 204) {
      return res; 
    } else {
      throw new Error("Request failed with status: " + res.status);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
