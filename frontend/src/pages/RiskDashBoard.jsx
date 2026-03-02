import { useParams } from "react-router-dom";
import { useState } from "react";
import { analyzeRisk, getRisk } from "../api/risk";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import api from "../api/axios"; 

export default function RiskDashboard() {
  const { projectId } = useParams();
  const [risk, setRisk] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    try {
      setLoading(true);
      await analyzeRisk(projectId);
      const res = await getRisk(projectId);
      setRisk(res.data.risk);
    } catch (err) {
      console.error("Risk error:", err);
    } finally {
      setLoading(false);
    }
  };


  const handleDownload = async () => {
    try {
      const res = await api.get(`/risk/${projectId}/report`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `project-${projectId}-risk-report.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Download error:", err);
    }
  };

  const taskChartData =
    risk?.tasksRisk?.map((t) => ({
      name: `Task ${t.taskId}`,
      risk: Number((t.risk * 100).toFixed(0)),
    })) || [];

  const summaryData = [
    { name: "Delay", value: risk?.delayProb * 100 },
    { name: "Cost", value: risk?.costRisk * 100 },
    { name: "Material", value: risk?.materialRiskScore * 100 },
    { name: "Labor", value: risk?.laborRiskScore * 100 },
  ];

  const getColor = (value) => {
    if (value > 0.7) return "bg-red-500";
    if (value > 0.4) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10 space-y-10">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Risk Dashboard</h1>

        <button
          onClick={handleAnalyze}
          className="bg-blue-600 px-6 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          {loading ? "Analyzing..." : "Analyze Risk"}
        </button>

        <button
          onClick={handleDownload}
          className="bg-green-600 px-4 py-2 rounded-lg"
        >
          Download PDF
        </button>
      </div>

      {risk && (
        <>
          {/* KPI CARDS */}
          <div className="grid grid-cols-4 gap-6">
            {[
              { label: "Delay Probability", value: risk.delayProb },
              { label: "Cost Risk", value: risk.costRisk },
              { label: "Material Risk", value: risk.materialRiskScore },
              { label: "Labor Risk", value: risk.laborRiskScore },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-slate-900 p-6 rounded-2xl shadow-lg space-y-3"
              >
                <h2 className="text-gray-400 text-sm">{item.label}</h2>
                <div className="text-2xl font-bold">
                  {(item.value * 100).toFixed(0)}%
                </div>

                <div className="w-full bg-slate-700 h-3 rounded-full">
                  <div
                    className={`h-3 rounded-full ${getColor(item.value)}`}
                    style={{ width: `${item.value * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* TASK RISK TABLE */}
          <div className="bg-slate-900 p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold mb-6">Task Risk Breakdown</h2>

            <div className="space-y-4">
              {risk.tasksRisk?.map((task, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-1">
                    <span>Task {task.taskId}</span>
                    <span>{(task.risk * 100).toFixed(0)}%</span>
                  </div>

                  <div className="w-full bg-slate-700 h-2 rounded-full">
                    <div
                      className={`h-2 rounded-full ${getColor(task.risk)}`}
                      style={{ width: `${task.risk * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-lg font-semibold mb-4">
              Overall Risk Comparison
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={summaryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-lg font-semibold mb-4">
              Task Risk Distribution
            </h2>

            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={taskChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="risk" fill="#dc2626" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* RECOMMENDATIONS */}
          <div className="bg-slate-900 p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4">AI Recommendations</h2>

            <ul className="space-y-2 text-gray-300">
              {risk.recommendations?.map((rec, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-blue-400">•</span> {rec}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
