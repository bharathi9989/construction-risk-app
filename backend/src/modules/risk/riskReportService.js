import PDFDocument from "pdfkit";

export const generateRiskPDF = (res, project, risk) => {
  const doc = new PDFDocument();

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=project-${project.id}-risk-report.pdf`,
  );

  doc.pipe(res);

  doc.fontSize(20).text("Construction Risk Report", { align: "center" });
  doc.moveDown();

  doc.fontSize(14).text(`Project: ${project.name}`);
  doc.moveDown();

  doc.text(`Delay Probability: ${(risk.delayProb * 100).toFixed(0)}%`);
  doc.text(`Cost Risk: ${(risk.costRisk * 100).toFixed(0)}%`);
  doc.text(`Material Risk: ${(risk.materialRiskScore * 100).toFixed(0)}%`);
  doc.text(`Labor Risk: ${(risk.laborRiskScore * 100).toFixed(0)}%`);

  doc.moveDown();
  doc.fontSize(16).text("Task Risks:");
  doc.moveDown(0.5);

  risk.tasksRisk?.forEach((task) => {
    doc.text(`Task ${task.taskId} - ${(task.risk * 100).toFixed(0)}%`);
  });

  doc.moveDown();
  doc.fontSize(16).text("Recommendations:");
  doc.moveDown(0.5);

  risk.recommendations?.forEach((rec) => {
    doc.text(`• ${rec}`);
  });

  doc.end();
};
