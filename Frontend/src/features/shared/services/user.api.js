import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export async function followUser(username) {
  const response = await api.post(`/api/users/follow/${username}`);
  return response.data;
}

export async function unfollowUser(username) {
  const response = await api.post(`/api/users/unfollow/${username}`);
  return response.data;
}
