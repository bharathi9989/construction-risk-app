// src/modules/auth/authRoutes.js
import { Router } from "express";
import { asyncHandler } from "../../core/asyncHandler.js";
import { getMe, login, register } from "./authController.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

const router = Router();

router.post("/signup", asyncHandler(register));
router.post("/login", asyncHandler(login));
router.get("/me", authMiddleware, asyncHandler(getMe));

export default router;
