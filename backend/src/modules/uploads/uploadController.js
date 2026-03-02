import fs from "fs";
import csv from "csv-parser";
import { prisma } from "../../config/db.js";
import { HttpError } from "../../core/httpException.js";

export const uploadProjectPlan = async (req, res) => {
  if (!req.file) {
    throw new HttpError(400, "No file uploaded");
  }

  const projectId = Number(req.params.projectId);

  const project = await prisma.project.findFirst({
    where: { id: projectId, userId: req.user.id },
  });

  if (!project) {
    throw new HttpError(404, "Project not found");
  }

  const filePath = req.file.path;
  const rows = [];

  await new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => rows.push(data))
      .on("end", resolve)
      .on("error", reject);
  });

  if (!rows.length) {
    throw new HttpError(400, "CSV file is empty");
  }

  const tasksData = rows.map((row) => {
    const name = row["Task Name"];
    const duration = row["Duration"];
    const dependency = row["Dependency"] || null;

    if (!name || !duration) {
      throw new HttpError(
        400,
        "Invalid format. Required columns: Task Name & Duration",
      );
    }

    return {
      projectId,
      name: name.trim(),
      duration: Number(duration),
      dependency: dependency ? dependency.trim() : null,
    };
  });

  await prisma.task.createMany({
    data: tasksData,
  });

  return res.json({
    success: true,
    message: "Tasks uploaded successfully",
    inserted: tasksData.length,
  });
};
