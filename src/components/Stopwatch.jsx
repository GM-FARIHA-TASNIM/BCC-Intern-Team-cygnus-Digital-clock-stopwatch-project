import { useState, useEffect } from "react";

export default function Stopwatch() {
  const [running, setRunning] = useState(false);
  const [ms, setMs] = useState(0);

  useEffect(() => {
    let timer;
    if (running) {
      timer = setInterval(() => {
        setMs((prev) => prev + 10);
      }, 10);
    }
    return () => clearInterval(timer);
  }, [running]);

  const format = (valMs) => {
    const totalSec = Math.floor(valMs / 1000);
    const minutes = Math.floor(totalSec / 60);
    const seconds = totalSec % 60;
    const centi = Math.floor((valMs % 1000) / 10);

    return `${minutes}:${seconds.toString().padStart(2, "0")}.${centi
      .toString()
      .padStart(2, "0")}`;
  };

  const handleReset = () => {
    setRunning(false);
    setMs(0);
  };

  return (
    <div className="stopwatch-inner">
      <div className="stopwatch-time">{format(ms)}</div>

      <div className="btn-row">
        <button className="btn primary-btn" onClick={() => setRunning(true)}>
          Start
        </button>
        <button className="btn secondary-btn" onClick={() => setRunning(false)}>
          Stop
        </button>
        <button className="btn accent-btn" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
}
