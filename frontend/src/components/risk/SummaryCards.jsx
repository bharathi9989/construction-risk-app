import { useEffect, useState } from "react";

export default function SummaryCards({ risk }) {
  const [delay, setDelay] = useState(0);
  const [cost, setCost] = useState(0);

  // Animate numbers on mount/update
  useEffect(() => {
    if (!risk) return;

    let delayInterval;
    let costInterval;

    const targetDelay = risk.delayProb || 0;
    const targetCost = risk.costRisk || 0;

    let d = 0;
    let c = 0;

    delayInterval = setInterval(() => {
      d += 1;
      if (d >= targetDelay) {
        d = targetDelay;
        clearInterval(delayInterval);
      }
      setDelay(d);
    }, 15);

    costInterval = setInterval(() => {
      c += 1;
      if (c >= targetCost) {
        c = targetCost;
        clearInterval(costInterval);
      }
      setCost(c);
    }, 15);

    return () => {
      clearInterval(delayInterval);
      clearInterval(costInterval);
    };
  }, [risk]);

  const highRiskCount =
    risk?.tasksRisk?.filter((t) => t.risk > 0.7).length || 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Delay Probability */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
        <h3 className="text-sm text-gray-400 mb-2">Delay Probability</h3>

        <p className="text-3xl font-bold text-red-400 mb-4">{delay}%</p>

        <div className="w-full bg-gray-700 h-3 rounded-full overflow-hidden">
          <div
            className="h-3 bg-gradient-to-r from-red-500 to-pink-500 transition-all duration-500"
            style={{ width: `${delay}%` }}
          />
        </div>
      </div>

      {/* Cost Risk */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
        <h3 className="text-sm text-gray-400 mb-2">Cost Risk</h3>

        <p className="text-3xl font-bold text-yellow-400 mb-4">{cost}%</p>

        <div className="w-full bg-gray-700 h-3 rounded-full overflow-hidden">
          <div
            className="h-3 bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-500"
            style={{ width: `${cost}%` }}
          />
        </div>
      </div>

      {/* High Risk Tasks */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
        <h3 className="text-sm text-gray-400 mb-2">High Risk Tasks</h3>

        <p className="text-3xl font-bold text-pink-400">{highRiskCount}</p>

        <div className="mt-4 text-sm text-gray-400">
          Tasks with risk &gt; 0.7
        </div>
      </div>
    </div>
  );
}
