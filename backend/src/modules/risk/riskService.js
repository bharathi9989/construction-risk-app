import axios from "axios";
import { prisma } from "../../config/db.js";
import { HttpError } from "../../core/httpException.js";
import { ENV } from "../../config/env.js";

export const analyzeRiskForProject = async (userId, projectId) => {
  const pid = Number(projectId);

  const project = await prisma.project.findFirst({
    where: { id: pid, userId },
    include: { tasks: true },
  });

  if (!project) throw new HttpError(404, "Project not found");
  if (!project.tasks.length)
    throw new HttpError(400, "No tasks found for project");

  // if (!ENV.RISK_API_URL || !ENV.RISK_API_KEY)
  //   throw new HttpError(500, "Risk API not configured");

  const payload = {
    project: {
      id: project.id,
      name: project.name,
    },
    tasks: project.tasks,
  };

  let ai;

  try {
    const response = await axios.post(ENV.RISK_API_URL, payload, {
      headers: {
        Authorization: `Bearer ${ENV.RISK_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    console.log("=========== CORTEX RESPONSE ===========");
    console.log(response.data);
    console.log("=======================================");

    ai = response.data;
  } catch (err) {
    console.error("=========== FULL AI ERROR ===========");
    console.error("Status:", err.response?.status);
    console.error("Data:", err.response?.data);
    console.error("Message:", err.message);
    console.error("=====================================");

    throw new HttpError(502, "External AI API failed");
  }

  const saved = await prisma.riskResult.upsert({
    where: { projectId: pid },
    update: {
      delayProb: ai.delayProb,
      costRisk: ai.costRisk,
      materialRiskScore: ai.materialRiskScore,
      laborRiskScore: ai.laborRiskScore,
      tasksRisk: ai.tasksRisk,
      recommendations: ai.recommendations,
    },
    create: {
      projectId: pid,
      delayProb: ai.delayProb,
      costRisk: ai.costRisk,
      materialRiskScore: ai.materialRiskScore,
      laborRiskScore: ai.laborRiskScore,
      tasksRisk: ai.tasksRisk,
      recommendations: ai.recommendations,
    },
  });

  return saved;
};

export const getRiskForProject = async (userId, projectId) => {
  const pid = Number(projectId);

  const project = await prisma.project.findFirst({
    where: { id: pid, userId },
  });

  if (!project) throw new HttpError(404, "Project not found");

  const risk = await prisma.riskResult.findUnique({
    where: { projectId: pid },
  });

  if (!risk) throw new HttpError(404, "Risk not calculated yet");

  return risk;
};
