import { prisma } from "../../config/db.js";
import { HttpError } from "../../core/httpException.js";

export const createTask = async (
  userId,
  projectId,
  { name, duration, dependency }
) => {
  if (!name) throw new HttpError(400, "Task Name is Required");

  const project = await prisma.project.findUnique({
    where: { id: Number(projectId) },
  });

  if (!project) throw new HttpError(404, "Project Not Found");
  if (project.userId !== userId) throw new HttpError(403, "Access Denied");

  const task = await prisma.task.create({
    data: {
      name,
      duration,
      dependency,
      projectId: Number(projectId),
    },
  });

  return task;
};

export const getTaskByProject = async (userId, projectId) => {
  const project = await prisma.project.findUnique({
    where: { id: Number(projectId) },
  });

  if (!project) throw new HttpError(404, "Project Not Found");
  if (project.userId !== userId) throw new HttpError(403, "Access Denied");

  const tasks = await prisma.task.findMany({
    where: { projectId: Number(projectId) },
    orderBy: { id: "asc" },
  });

  return tasks;
};

export const deleteTask = async (userId, taskId) => {
  const task = await prisma.task.findUnique({
    where: { id: Number(taskId) },
  });

  if (!task) throw new HttpError(404, "Task Not Found");

  const project = await prisma.project.findUnique({
    where: { id: task.projectId },
  });

  if (project.userId !== userId) throw new HttpError(403, "Access Denied");

  await prisma.task.delete({
    where: { id: Number(taskId) },
  });

  return true;
};
