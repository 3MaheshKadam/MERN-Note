import express from "express";
import {
  test,
  updateUser,
  deleteUser,
  getUserNotes,
} from "../controller/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router();

router.get("/test", test);
router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);
router.get("/notes/:id", verifyToken, getUserNotes);

export default router;
