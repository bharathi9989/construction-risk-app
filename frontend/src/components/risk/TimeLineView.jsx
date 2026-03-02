export default function TimelineView({ tasksRisk }) {
  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg mt-8">
      <h2 className="text-xl font-semibold mb-4 text-white">
        Predicted Delay Timeline
      </h2>

      <ul className="space-y-3">
        {tasksRisk.map((t) => (
          <li
            key={t.taskId}
            className="flex justify-between bg-gray-700 px-4 py-3 rounded-lg"
          >
            <span>Task #{t.taskId}</span>

            <span
              className={`font-semibold ${
                t.risk > 0.7
                  ? "text-red-400"
                  : t.risk > 0.4
                    ? "text-yellow-400"
                    : "text-green-400"
              }`}
            >
              {t.risk}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
