import * as ProjectService from "./projectService.js";

export const createProject = async (req, res) => {
  const project = await ProjectService.createProject(req.user.id, req.body);
  res.status(201).json({
    success: true,
    project,
  });
};

export const getProjects = async (req, res) => {
  const projects = await ProjectService.getProjects(req.user.id);
  res.json({
    success: true,
    projects,
  });
};

export const getProjectById = async (req, res) => {
  const project = await ProjectService.getProjectById(
    req.user.id,
    req.params.id
  );

  res.json({
    success: true,
    project,
  });
};

export const deleteProject = async (req, res) => {
  await ProjectService.deleteProject(req.user.id, req.params.id);
  res.json({
    success: true,
    message: "Project deleted successfully",
  });
};
