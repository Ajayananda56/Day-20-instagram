import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: `${BASE_URL}/api/auth`,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export async function login(username, password) {
  const response = await api.post("/login", {
    username,
    password,
  });

  if (response.data?.token) {
    localStorage.setItem("token", response.data.token);
  }

  return response.data;
}

export async function register(username, email, password) {
  const response = await api.post("/register", { username, email, password });

  if (response.data?.token) {
    localStorage.setItem("token", response.data.token);
  }

  return response.data;
}

export async function getMe() {
  const response = await api.get("/get-me");

  return response.data;
}
