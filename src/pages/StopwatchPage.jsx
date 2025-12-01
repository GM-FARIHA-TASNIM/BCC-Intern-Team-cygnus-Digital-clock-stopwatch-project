import Stopwatch from "../components/Stopwatch";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Link } from "react-router-dom";

export default function StopwatchPage() {
  const { dark, setDark } = useContext(ThemeContext);

  return (
    <div className="page">
      <button className="theme-toggle" onClick={() => setDark(!dark)}>
        {dark ? "Light" : "Dark"}
      </button>

      <div className="stopwatch-wrapper">
        {/* Upore big back button, same style as Go to Stopwatch */}
        <Link to="/" className="primary-link back-btn">
          Back to Clock
        </Link>

        <p className="stopwatch-heading">
          Start counting now — every second is a new chance.
        </p>

        <div className="stopwatch-card">
          <h2 className="stopwatch-title">Stopwatch</h2>
          <Stopwatch />
        </div>

        <p className="stopwatch-note">
          Small seconds quietly build the biggest moments.
        </p>
      </div>
    </div>
  );
}
