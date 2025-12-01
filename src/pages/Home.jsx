import { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import DigitalClock from "../components/DigitalClock";

export default function Home() {
  const { dark, setDark } = useContext(ThemeContext);

  return (
    <div className="page">
      <button className="theme-toggle" onClick={() => setDark(!dark)}>
        {dark ? "Light" : "Dark"}
      </button>

      <div className="home-wrapper">
        <h1 className="app-title">Time Keeper</h1>
        <p className="app-subtitle">Keep every second in sight.</p>

        <DigitalClock />

        <Link to="/stopwatch" className="primary-link">
          Go to Stopwatch
        </Link>
      </div>
    </div>
  );
}
