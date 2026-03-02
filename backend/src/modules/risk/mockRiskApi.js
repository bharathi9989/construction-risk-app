export const mockRiskApi = (req, res) => {
  const { tasks } = req.body;

  if (!tasks || !Array.isArray(tasks)) {
    return res.status(400).json({
      success: false,
      message: "Tasks array is required",
    });
  }

  // Basic deterministic scoring
  const delayProb = Number((tasks.length * 0.05).toFixed(2));
  const costRisk = Number((tasks.length * 0.04).toFixed(2));
  const materialRiskScore = Number((tasks.length * 0.03).toFixed(2));
  const laborRiskScore = Number((tasks.length * 0.02).toFixed(2));

  const tasksRisk = tasks.map((t) => ({
    taskId: t.id,
    risk: Number((Math.random() * 0.8 + 0.2).toFixed(2)),
  }));

  const recommendations = [];

  if (delayProb > 0.5) {
    recommendations.push("Consider reallocating resources to critical tasks.");
  }

  if (costRisk > 0.4) {
    recommendations.push("Review procurement strategy to reduce cost overrun.");
  }

  return res.json({
    delayProb: Number(delayProb.toFixed(2)),
    costRisk: Number(costRisk.toFixed(2)),
    materialRiskScore,
    laborRiskScore,
    tasksRisk,
    recommendations,
  });
};
