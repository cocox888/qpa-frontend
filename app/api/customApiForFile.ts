import axios from "axios";

// Create an Axios instance
const apiForFile = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PRODUCT_BACKEND_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// Intercept requests to add the JWT token when needed
apiForFile.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("refresh_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Set Bearer token
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiForFile;
