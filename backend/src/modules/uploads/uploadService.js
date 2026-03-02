import axios from "axios";
import { prisma } from "../../config/db.js";
import { HttpError } from "../../core/httpException.js";
import { parseCSV, parseExcel, parseJSON } from "../../utils/csvParser.js";
import { ENV } from "../../config/env.js";
import path from "path";

export const processUploadedFile = async (userId, projectId, file) => {
  if (!file) throw new HttpError(400, "File is required");

  const pid = Number(projectId);

  // 1️⃣ Validate Project Ownership
  const project = await prisma.project.findUnique({
    where: { id: pid },
  });

  if (!project) throw new HttpError(404, "Project not found");
  if (project.userId !== userId) throw new HttpError(403, "Access denied");

  // 2️⃣ Parse File
  const ext = path.extname(file.originalname).toLowerCase();
  let rows;

  if (ext === ".csv") rows = await parseCSV(file.path);
  else if (ext === ".xlsx") rows = await parseExcel(file.path);
  else if (ext === ".json") rows = await parseJSON(file.path);
  else throw new HttpError(400, "Unsupported file type");

  // 3️⃣ Normalize Tasks
  const tasksData = rows.map((r) => ({
    name: r.name || r.task || "Untitled Task",
    duration: Number(r.duration) || 0,
    dependency: r.dependency || null,
    projectId: pid,
  }));

  // 4️⃣ Save Tasks
  await prisma.task.createMany({
    data: tasksData,
  });

  // 5️⃣ Prepare Payload for AI
  const payload = {
    project: {
      id: project.id,
      name: project.name,
    },
    tasks: tasksData,
  };

  if (!ENV.RISK_API_URL || !ENV.RISK_API_KEY) {
    throw new HttpError(500, "AI API not configured");
  }

  // 6️⃣ Call External AI API
  let aiResponse;

  try {
    const response = await axios.post(ENV.RISK_API_URL, payload, {
      headers: {
        Authorization: `Bearer ${ENV.RISK_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    aiResponse = response.data;
  } catch (err) {
    console.error("AI API Error:", err.response?.data || err.message);
    throw new HttpError(502, "External AI API failed");
  }

  // 7️⃣ Save AI Result
  const savedRisk = await prisma.riskResult.upsert({
    where: { projectId: pid },
    update: {
      delayProb: aiResponse.delayProb,
      costRisk: aiResponse.costRisk,
      tasksRisk: aiResponse.tasksRisk,
      recommendations: aiResponse.recommendations,
    },
    create: {
      projectId: pid,
      delayProb: aiResponse.delayProb,
      costRisk: aiResponse.costRisk,
      tasksRisk: aiResponse.tasksRisk,
      recommendations: aiResponse.recommendations,
    },
  });

  return {
    message: "File processed and AI analysis completed",
    taskCount: tasksData.length,
    risk: savedRisk,
  };
};
