import { useEffect, useState } from "react";

export default function RiskGauge({ value, label }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      if (current >= value) {
        current = value;
        clearInterval(interval);
      }
      setProgress(current);
    }, 10);

    return () => clearInterval(interval);
  }, [value]);

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  const getColor = () => {
    if (progress > 70) return "#ef4444";
    if (progress > 40) return "#f59e0b";
    return "#22c55e";
  };

  return (
    <div className="flex flex-col items-center">
      <svg width="180" height="180">
        <circle
          cx="90"
          cy="90"
          r={radius}
          stroke="#334155"
          strokeWidth="15"
          fill="transparent"
        />
        <circle
          cx="90"
          cy="90"
          r={radius}
          stroke={getColor()}
          strokeWidth="15"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 90 90)"
          style={{ transition: "stroke-dashoffset 0.5s ease" }}
        />
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="white"
          fontSize="22"
          fontWeight="bold"
        >
          {progress}%
        </text>
      </svg>

      <p className="mt-4 text-gray-400">{label}</p>
    </div>
  );
}
