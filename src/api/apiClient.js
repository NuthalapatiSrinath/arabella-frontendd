import axios from "axios";
import store from "../redux/store";
import { logout } from "../redux/slices/authSlice";

const apiClient = axios.create({
  baseURL: "http://localhost:4000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// 1. Attach Token to Requests
apiClient.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 2. Handle Unauthorized Errors (401)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token is invalid/expired -> Log them out
      store.dispatch(logout());
      // Optional: Open login modal immediately
      // store.dispatch(openModal({ type: 'authModal', modalData: { mode: 'login' } }));
    }
    return Promise.reject(error);
  }
);

export default apiClient;
