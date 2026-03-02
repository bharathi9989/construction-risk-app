import { useEffect, useState } from "react";
import { getProjects, createProject } from "../api/project";
import { useNavigate } from "react-router-dom";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    const res = await getProjects();
    setProjects(res.data.projects || []);
  };

  const handleCreate = async () => {
    if (!name.trim()) return;
    await createProject({ name });
    setName("");
    setOpen(false);
    loadProjects();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>

        <button
          onClick={() => setOpen(true)}
          className="bg-gradient-to-r from-blue-500 to-purple-600 
                     px-5 py-2 rounded-lg text-sm font-semibold
                     hover:scale-105 transition"
        >
          + New Project
        </button>
      </div>

      {/* Empty State */}
      {projects.length === 0 && (
        <div
          className="bg-slate-900 border border-slate-800 
                        rounded-2xl p-12 text-center space-y-4"
        >
          <h2 className="text-xl font-semibold">No Projects Yet</h2>
          <p className="text-gray-400 text-sm">
            Create your first project to start risk analysis.
          </p>
        </div>
      )}

      {/* Project Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {projects.map((p) => (
          <div
            key={p.id}
            className="bg-slate-900 border border-slate-800
                       rounded-2xl p-6 hover:border-blue-500
                       transition cursor-pointer group"
            onClick={() => navigate(`/projects/${p.id}/tasks`)}
          >
            <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-400 transition">
              {p.name}
            </h3>

            <div className="flex justify-between items-center mt-4 text-sm text-gray-400">
              <span>ID: {p.id}</span>
              <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-md text-xs">
                Active
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Create Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-slate-900 p-8 rounded-2xl w-96 space-y-4 border border-slate-800">
            <h2 className="text-xl font-semibold">Create Project</h2>

            <input
              placeholder="Project Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-lg bg-slate-800 
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 text-sm bg-slate-700 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleCreate}
                className="px-4 py-2 text-sm bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
