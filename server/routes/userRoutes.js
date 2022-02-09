import express from "express";
import { signIn, signUp, getUsers } from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/signIn", signIn);
router.post("/signUp", signUp);

export default router;
