// // apiConfig.js

// import { Configuration } from "./configuration";

// // const API_BASE_URL = process.env.NODE_ENV === 'production' ? 'https://api.example.com' : 'http://localhost:8000'
// export const apiConfig = {
//     //baseUrl: 'https://pos-kds-poc-api-dev.azurewebsites.net',
//     baseUrl: 'http://localhost:8080',

//     // Add other configuration options here
// };
// export const ApiConfiguration = new Configuration({
//     basePath: apiConfig.baseUrl,
// });

import axios from "axios";
import { Configuration } from "./configuration";

// Define your API base URL
export const apiConfig = {
  baseUrl:
    process.env.NODE_ENV === "production"
      ? "https://api.example.com"
      : "http://localhost:8080",
  token: "",
  // Add other configuration options here
};

// Create a new Axios instance with your base URL
const axiosInstance = axios.create({
  baseURL: apiConfig.baseUrl,
});

export const setApiToken = (token: any) => {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  apiConfig.token = token;
};

// axiosInstance.interceptors.request.use(
//   (req) => {
//     console.log("The axios interceptors..." + { req });
//     return req;
//   },
//   (error) => {
//     console.log("The axios interceptors..." + { error });
//     return Promise.reject(error);
//   }
// );

// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export const ApiConfiguration = new Configuration({
  basePath: apiConfig.baseUrl,
  apiKey: apiConfig.token
});

export default axiosInstance;
