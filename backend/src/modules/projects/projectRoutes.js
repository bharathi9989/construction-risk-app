import { Router } from "express";
import { asyncHandler } from "../../core/asyncHandler.js";
import authMiddleware from "../../middlewares/authMiddleware.js";
import { requireRole } from "../../middlewares/requireRole.js";
import {
  createProject,
  deleteProject,
  getProjectById,
  getProjects,
} from "./projectController.js";

const router = Router();

router.post("/", authMiddleware, asyncHandler(createProject));
router.get("/", authMiddleware, asyncHandler(getProjects));
router.get("/:id", authMiddleware, asyncHandler(getProjectById));
router.delete("/:id", authMiddleware,requireRole("ADMIN"), asyncHandler(deleteProject));

export default router;
