import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:5000" });

export const getTasks = () => api.get("/tasks");

export const postTask = (task) => api.post("/tasks", task);

export const updateTask = (id, task) => api.patch(`/tasks/${id}`, task);

export const deleteTask = (id) => api.delete(`/tasks/${id}`);
