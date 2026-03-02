import api from "./axios";

export const getTasks = (projectId) => {
  return api.get(`/task/${projectId}`);
};

export const createTask = (projectId, data) => {
  return api.post(`/task/${projectId}`, data);
};

export const uploadTasksFile = (projectId, formData) => {
  return api.post(`/upload/${projectId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
