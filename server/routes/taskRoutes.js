import express from "express";
import { getTasks, createTask } from "../controllers/taskController.js";

const router = express.Router();
//TODO: use Express Async handler
router.get("/", getTasks);
router.post("/", createTask);

export default router;
