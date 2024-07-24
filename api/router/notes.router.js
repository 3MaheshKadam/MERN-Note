import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createNote,
  deleteNote,
  getNote,
  updateNote,
} from "../controller/notes.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createNote);
router.delete("/delete/:id", verifyToken, deleteNote);
router.post("/update/:id", verifyToken, updateNote); //id indicate post id
router.get("/get/:id", getNote);

export default router;
