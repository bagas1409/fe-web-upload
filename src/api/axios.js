import axios from "axios";

const api = axios.create({
  baseURL: "https://upload-web.up.railway.app",
});

// INTERCEPTOR: SELALU AMBIL TOKEN TERBARU
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
