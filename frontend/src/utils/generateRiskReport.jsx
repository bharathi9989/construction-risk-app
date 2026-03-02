import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generateRiskReport = (projectId, risk) => {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(18);
  doc.text("Construction Risk Intelligence Report", 14, 20);

  doc.setFontSize(11);
  doc.text(`Project ID: ${projectId}`, 14, 30);
  doc.text(`Generated On: ${new Date().toLocaleString()}`, 14, 36);

  // Summary Section
  doc.setFontSize(14);
  doc.text("Risk Summary", 14, 50);

  autoTable(doc, {
    startY: 55,
    head: [["Metric", "Value"]],
    body: [
      ["Delay Probability", `${risk.delayProb}%`],
      ["Cost Risk", `${risk.costRisk}%`],
      ["High Risk Tasks", risk.tasksRisk.filter((t) => t.risk > 0.7).length],
    ],
  });

  // Task Risk Table
  doc.setFontSize(14);
  doc.text("Task Risk Breakdown", 14, doc.lastAutoTable.finalY + 15);

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 20,
    head: [["Task ID", "Risk Level"]],
    body: risk.tasksRisk.map((t) => [t.taskId || t.id, t.risk]),
  });

  doc.save(`risk-report-project-${projectId}.pdf`);
};
