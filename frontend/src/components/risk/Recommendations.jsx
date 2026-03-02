export default function Recommendations({ risk }) {
  if (!risk.recommendations?.length) return null;

  return (
    <div className="civil-card mt-8">
      <h2 className="text-xl font-semibold mb-6">AI Recommendations</h2>

      <div className="space-y-4">
        {risk.recommendations.map((rec, index) => (
          <div
            key={index}
            className="bg-gray-700 p-4 rounded-xl flex justify-between items-start"
          >
            <div>
              <h3 className="font-semibold text-white">{rec.title}</h3>
              <p className="text-gray-400 text-sm mt-1">{rec.suggestion}</p>
            </div>

            <div className="text-right">
              <p
                className={`text-sm font-bold ${
                  rec.severity === "High"
                    ? "text-red-400"
                    : rec.severity === "Medium"
                      ? "text-yellow-400"
                      : "text-green-400"
                }`}
              >
                {rec.severity}
              </p>

              <p className="text-xs text-gray-400 mt-1">
                Impact: {rec.impactScore}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
