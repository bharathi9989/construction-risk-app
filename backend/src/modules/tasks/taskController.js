import * as TaskService from "./taskService.js  ";

export const createTask = async (req, res) => {
  const task = await TaskService.createTask(
    req.user.id,
    req.params.projectId,
    req.body
  );
  res.status(201).json({
    success: true,
    task,
  });
};

export const getTaskByProject = async (req, res) => {
  const tasks = await TaskService.getTaskByProject(
    req.user.id,
    req.params.projectId
  );
  res.json({
    success: true,
    tasks,
  });
};

export const deleteTask = async (req, res) => {
  await TaskService.deleteTask(req.user.id, req.params.taskId);
  res.json({
    success: true,
    message: "Task Deleted",
  });
};
