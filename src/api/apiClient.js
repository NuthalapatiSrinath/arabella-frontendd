import axios from "axios";

// ⚠️ CHANGE THIS if your backend runs on a different port/URL
const BASE_URL = "http://localhost:4000/api";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// --- REQUEST INTERCEPTOR (Auto-Attach Token) ---
apiClient.interceptors.request.use(
  (config) => {
    // We assume you store the JWT token in localStorage as "token"
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // If sending FormData (images), let the browser set the Content-Type automatically
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// --- RESPONSE INTERCEPTOR (Global Error Handling) ---
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Optional: Auto-logout on 401 Unauthorized
    if (error.response && error.response.status === 401) {
      // console.warn("Session expired. Redirecting to login...");
      // localStorage.removeItem("token");
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default apiClient;
