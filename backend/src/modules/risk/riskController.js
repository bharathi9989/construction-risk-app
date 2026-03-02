import { analyzeRiskForProject, getRiskForProject } from "./riskService.js";
import { prisma } from "../../config/db.js";
import { generateRiskPDF } from "./riskReportService.js";

export const analyzeRisk = async (req, res) => {
  const result = await analyzeRiskForProject(req.user.id, req.params.projectId);

  res.json({
    success: true,
    risk: result,
  });
};

export const getRisk = async (req, res) => {
  const risk = await getRiskForProject(req.user.id, req.params.projectId);

  res.json({
    success: true,
    risk,
  });
};

export const downloadRiskReport = async (req, res) => {
  const projectId = Number(req.params.projectId);

  const project = await prisma.project.findUnique({
    where: { id: projectId },
  });

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  const risk = await prisma.riskResult.findUnique({
    where: { projectId },
  });

  if (!risk) {
    return res.status(404).json({ message: "No risk data available" });
  }

  generateRiskPDF(res, project, risk);
};
