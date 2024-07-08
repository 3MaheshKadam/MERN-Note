import express from "express";
import { signup, signin, signOut } from "../controller/auth.controllers.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/signout", signOut);

export default router;
