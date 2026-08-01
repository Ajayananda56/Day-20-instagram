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

export async function getFeed() {
  const response = await api.get("/api/posts/feed");
  return response.data;
}

export async function createPost(imageFile, caption) {
  const formData = new FormData();
  formData.append("chacha", imageFile);
  formData.append("caption", caption);

  const response = await api.post("/api/posts", formData);

  return response.data;
}

export async function toggleLike(postId) {
  const response = await api.post(`/api/posts/like/${postId}`);
  return response.data;
}

export async function deletePost(postId) {
  const response = await api.delete(`/api/posts/${postId}`);
  return response.data;
}
