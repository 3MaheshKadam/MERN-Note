import express from "express";
import {
  createNote,
  deleteNote,
  getNote,
  updateNote,
} from "../controller/notes.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createNote);
router.delete("/delete/:id", verifyToken, deleteNote);
router.put("/update/:id", verifyToken, updateNote); // Use PUT for updating
router.get("/get/:id", getNote);
export default router;
