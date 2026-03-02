import { Router } from "express";
import authMiddleware from "../../middlewares/authMiddleware.js";
import { asyncHandler } from "../../core/asyncHandler.js";
import { createTask, deleteTask, getTaskByProject } from "./taskController.js";

const router = Router();

router.post("/:projectId", authMiddleware, asyncHandler(createTask));
router.get("/:projectId", authMiddleware, asyncHandler(getTaskByProject));
router.delete("/:taskId", authMiddleware, asyncHandler(deleteTask));

export default router;
