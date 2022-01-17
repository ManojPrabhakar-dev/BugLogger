import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:5000" });

export const getTasks = () => api.get("/tasks");

export const postTask = (task) => api.post("/tasks", task);
