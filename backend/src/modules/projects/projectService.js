import { prisma } from "../../config/db.js";
import { HttpError } from "../../core/httpException.js";

export const createProject = async (userId, { name }) => {
  if (!name) throw new HttpError(400, "Project nama is required");

  const project = await prisma.project.create({
    data: { name, userId },
  });

  return project;
};

export const getProjects = async (userId) => {
  const projects = await prisma.project.findMany({
    where: { userId },
    orderBy: { id: "desc" },
  });

  return projects;
};

export const getProjectById = async (userId, projectId) => {
  const project = await prisma.project.findUnique({
    where: { id: Number(projectId) },
  });

  if (!project) throw new HttpError(404, "Project Not Found");
  if (project.userId !== userId) throw new HttpError(403, "Access Denied");

  return project;
};

export const deleteProject = async (userId, projectId) => {
  const project = await prisma.project.findUnique({
    where: { id: Number(projectId) },
  });

  if (!project) throw new HttpError(404, "Project Not Found");
  if (project.userId !== userId) throw new HttpError(403, "Access Denied");

  await prisma.project.delete({
    where: { id: Number(projectId) },
  });
  return true;
};
