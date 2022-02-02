import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:5000" });

api.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const getTasks = () => api.get("/tasks");

export const postTask = (task) => api.post("/tasks", task);

export const updateTask = (id, task) => api.patch(`/tasks/${id}`, task);

export const deleteTask = (id) => api.delete(`/tasks/${id}`);

export const getUsers = () => api.get("/users");
export const signIn = (userData) => api.post(`/users/signIn`, userData);
export const signUp = (userData) => api.post(`/users/signUp`, userData);
