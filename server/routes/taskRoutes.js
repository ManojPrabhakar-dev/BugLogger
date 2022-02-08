import express from "express";
import auth from "../middleware/authMiddleware.js";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  downloadFile,
} from "../controllers/taskController.js";
import { upload } from "../util/uploadConfig.js";

const router = express.Router();
//TODO: use Express Async handler
router.get("/", getTasks);
router.get("/download/:id", downloadFile);
router.post("/", auth, upload.single("file"), createTask);
router.patch("/:id", auth, updateTask);
router.delete("/:id", auth, deleteTask);

export default router;
