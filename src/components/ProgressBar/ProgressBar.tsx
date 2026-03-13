import { useEffect, useState } from "react";
import "./ProgressBar.css";

interface ProgressBarProps {
  value: number;
}

export const ProgressBar = ({ value }: ProgressBarProps) => {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    setPercentage(Math.min(100, Math.max(0, Math.round(value))));
  }, [value]);

  return (
    <div
      className="progress"
      role="progressbar"
      aria-valuenow={percentage}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Profile completeness: ${percentage}%`}
    >
      <div className="progress__fill" style={{ width: `${percentage}%` }}>
        <span className="progress__percentage">{percentage}%</span>
      </div>
    </div>
  );
};
