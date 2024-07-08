import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { createNote } from "../controller/notes.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createNote);

export default router;
