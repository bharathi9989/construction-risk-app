import { Router } from "express";

const router = Router();

router.post("/analyze", (req, res) => {
  const { tasks } = req.body;

  if (!tasks || !tasks.length) {
    return res.status(400).json({ message: "No tasks provided" });
  }

  const delayProb = Number(Math.random().toFixed(2));
  const costRisk = Number(Math.random().toFixed(2));
  const materialRiskScore = Number(Math.random().toFixed(2));
  const laborRiskScore = Number(Math.random().toFixed(2));

  const tasksRisk = tasks.map((task, index) => ({
    taskId: index + 1,
    risk: Number(Math.random().toFixed(2)),
  }));

  const recommendations = [
    "Increase manpower for high-risk tasks",
    "Monitor supplier delays",
    "Add contingency buffer",
  ];

  res.json({
    delayProb,
    costRisk,
    materialRiskScore,
    laborRiskScore,
    tasksRisk,
    recommendations,
  });
});

export default router;
