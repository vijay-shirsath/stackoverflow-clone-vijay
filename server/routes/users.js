//in this page only the routes are comes along with that

import express from "express";
import { signup, login } from "../controllers/Auth.js";
import { getAllUsers, updateProfile } from "../controllers/users.js";

const router = express.Router();

router.post("/signup",signup);
router.post("/login",login);


router.get("/getAllUsers",getAllUsers)
export default router;

router.patch("/update/:id",updateProfile);