import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { createNote, deleteNote } from "../controller/notes.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createNote);
router.delete("/delete/:id", verifyToken, deleteNote);

export default router;
