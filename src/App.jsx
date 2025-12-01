import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import StopwatchPage from "./pages/StopwatchPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/stopwatch" element={<StopwatchPage />} />
    </Routes>
  );
}
