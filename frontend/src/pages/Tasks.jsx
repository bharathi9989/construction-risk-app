import { useState, useEffect } from "react";
import api from "../api/axios";
import { useParams, useNavigate } from "react-router-dom";
import { getRisk } from "../api/risk";

export default function TasksPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [dependency, setDependency] = useState("");
  const [file, setFile] = useState(null);
  const [riskData, setRiskData] = useState(null);

  useEffect(() => {
    fetchTasks();
    fetchRisk();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await api.get(`/task/${projectId}`);
      setTasks(res.data.tasks);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };
  const handleAddTask = async () => {
    await api.post(`/task/${projectId}`, {
      name,
      duration: Number(duration),
      dependency,
    });

    setName("");
    setDuration("");
    setDependency("");
    fetchTasks();
  };

  const fetchRisk = async () => {
    try {
      const res = await getRisk(projectId);
      setRiskData(res.data.risk);
    } catch {}
  };

  const handleUpload = async () => {
    if (!file) return alert("Choose a file");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await api.post(`/upload/${projectId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(res.data.message);
      fetchTasks();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Upload failed");
    }
  };

  const riskMap =
    riskData?.tasksRisk?.reduce((acc, t) => {
      acc[t.taskId] = t.risk;
      return acc;
    }, {}) || {};

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">Project Tasks</h1>
        <button
          onClick={() => navigate(`/risk/${projectId}`)}
          className="bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Go To Risk Dashboard
        </button>
      </div>

      {/* ADD TASK CARD */}
      <div className="bg-slate-900 p-6 rounded-2xl shadow-xl mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Task</h2>

        <div className="grid grid-cols-3 gap-4">
          <input
            placeholder="Task Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-slate-800 p-3 rounded-lg"
          />
          <input
            placeholder="Duration (days)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="bg-slate-800 p-3 rounded-lg"
          />
          <input
            placeholder="Dependency"
            value={dependency}
            onChange={(e) => setDependency(e.target.value)}
            className="bg-slate-800 p-3 rounded-lg"
          />
        </div>

        <button
          onClick={handleAddTask}
          className="mt-4 bg-green-600 px-6 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Add Task
        </button>
      </div>

      {/* FILE UPLOAD CARD */}
      <div className="bg-slate-900 p-6 rounded-2xl shadow-xl mb-8">
        <h2 className="text-xl font-semibold mb-4">Upload CSV / Excel</h2>

        <div className="flex gap-4 items-center">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="bg-slate-800 p-2 rounded-lg"
          />
          <button
            onClick={handleUpload}
            className="bg-purple-600 px-6 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Upload File
          </button>
        </div>
      </div>

      {/* TASK LIST */}
      <div className="bg-slate-900 p-6 rounded-2xl shadow-xl">
        <h2 className="text-xl font-semibold mb-6">Task List</h2>

        {tasks.length === 0 ? (
          <p className="text-gray-400">No tasks available.</p>
        ) : (
          <div className="space-y-4">
            {tasks.map((task) => {
              const taskRisk = riskMap[task.id];

              return (
                <div
                  key={task.id}
                  className={`p-4 rounded-lg shadow transition
        ${
          taskRisk > 0.6
            ? "bg-red-100 border-l-4 border-red-600"
            : taskRisk > 0.4
              ? "bg-yellow-100 border-l-4 border-yellow-500"
              : "bg-white"
        }`}
                >
                  <div className="flex justify-between">
                    <span className="font-medium">{task.name}</span>
                    {taskRisk && (
                      <span className="text-sm font-semibold">
                        {(taskRisk * 100).toFixed(0)}%
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-gray-500">
                    Duration: {task.duration}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
