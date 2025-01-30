import axios from "axios";

const API_URL = "http://34.66.153.5:3000"; // Replace with your backend URL

const instance = axios.create({
  baseURL: API_URL,
});

// Attach the token if it exists
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const api = {
  // Blog Routes
  getBlogsLatest: async () =>
    instance.get("/blog/latestBlogs").then((res) => res.data),

  getBlog: async (data: { id: string }) =>
    instance.post("/blog/getBlogById", data).then((res) => res.data),

  createBlog: async (data: {
    title: string;
    content: string;
    categoryName: string;
  }) => instance.post("/user/auth/createBlog", data).then((res) => res.data),

  // Auth Routes
  register: async (data: { name: string; email: string; password: string }) =>
    instance.post("/user/register", data).then((res) => res.data),

  login: async (data: { email: string; password: string }) =>
    instance.post("/user/login", data).then((res) => res.data),

  getCurUserWithBlogs: async () =>
    instance.get("/user/auth/getUserWithBlogs").then((res) => res.data),

  deleteBlog: async (data: { id: string }) =>
    instance
      .delete("/user/auth/deleteBlog", { data: data })
      .then((res) => res.data),

  getAllCategories: async () =>
    instance.get("/blog/categories").then((res) => res.data),

  updateUserBlog: (data: {
    id: string;
    title: string;
    content: string;
    categoryName: string;
  }) => instance.patch("/user/auth/updateBlog", data).then((res) => res.data),
};
