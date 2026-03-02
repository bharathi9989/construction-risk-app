import { Router } from "express";
import authMiddleware from "../../middlewares/authMiddleware.js";
import { analyzeRisk, getRisk } from "./riskController.js";
import { downloadRiskReport } from "./riskController.js";

const router = Router();

router.post("/:projectId", authMiddleware, analyzeRisk);
router.get("/:projectId", authMiddleware, getRisk);
router.get("/:projectId/report", authMiddleware, downloadRiskReport);
export default router;
