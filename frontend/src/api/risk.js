import api from "./axios";

// Call AI (mock or real)
export const analyzeRisk = (projectId) => api.post(`/risk/${projectId}`);

// Fetch stored risk
export const getRisk = (projectId) => api.get(`/risk/${projectId}`);
