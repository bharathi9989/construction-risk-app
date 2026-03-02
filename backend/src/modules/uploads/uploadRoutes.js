import { Router } from "express";
import multer from "multer";
import authMiddleware from "../../middlewares/authMiddleware.js";
import { uploadProjectPlan } from "./uploadController.js";

const router = Router();
const upload = multer({ dest: "uploads/" });

router.post(
  "/:projectId",
  authMiddleware,
  upload.single("file"),
  uploadProjectPlan,
);

export default router;
