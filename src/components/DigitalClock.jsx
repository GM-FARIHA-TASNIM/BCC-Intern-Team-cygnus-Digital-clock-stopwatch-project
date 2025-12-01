import { useEffect, useState } from "react";

function buildCalendar(year, month) {
  const firstDay = new Date(year, month, 1).getDay(); // 0-6
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < firstDay; i++) {
    cells.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(d);
  }
  return cells;
}

export default function DigitalClock() {
  const [now, setNow] = useState(new Date());
  const [showCal, setShowCal] = useState(false);
  const [calYear, setCalYear] = useState(now.getFullYear());
  const [calMonth, setCalMonth] = useState(now.getMonth());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n) => (n < 10 ? "0" + n : n);

  // 24-hour
  const h24 = pad(now.getHours());
  const m = pad(now.getMinutes());
  const s = pad(now.getSeconds());

  // 12-hour
  const h12Raw = now.getHours() % 12 || 12;
  const h12 = pad(h12Raw);
  const ampm = now.getHours() >= 12 ? "PM" : "AM";

  const day = now.toLocaleDateString("en-US", { weekday: "long" });
  const dateString = now.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const monthName = new Date(calYear, calMonth, 1).toLocaleDateString("en-US", {
    month: "long",
  });

  const calendarCells = buildCalendar(calYear, calMonth);

  const handlePrevMonth = () => {
    setCalMonth((prev) => {
      if (prev === 0) {
        setCalYear((y) => y - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  const handleNextMonth = () => {
    setCalMonth((prev) => {
      if (prev === 11) {
        setCalYear((y) => y + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  const handleToday = () => {
    const t = new Date();
    setCalYear(t.getFullYear());
    setCalMonth(t.getMonth());
  };

  return (
    <div className="clock-layout">
      {/* Day / Date + calendar card */}
      <div className="card day-card">
        <div className="day-main">
          <div>
            <div className="day-text">{day}</div>
            <div className="date-text">{dateString}</div>
          </div>
          <button
            className="calendar-toggle"
            onClick={() => setShowCal((v) => !v)}
          >
            ▢
          </button>
        </div>

        {showCal && (
          <div className="calendar-popup">
            <div className="calendar-header">
              <button className="calendar-nav" onClick={handlePrevMonth}>
                ‹
              </button>
              <span className="calendar-title">
                {monthName} {calYear}
              </span>
              <div className="calendar-header-right">
                <button className="calendar-today-btn" onClick={handleToday}>
                  Today
                </button>
                <button className="calendar-nav" onClick={handleNextMonth}>
                  ›
                </button>
              </div>
            </div>

            <div className="calendar-grid">
              {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
                <div key={d} className="calendar-cell calendar-head">
                  {d}
                </div>
              ))}
              {calendarCells.map((d, idx) => {
                const isToday =
                  d === now.getDate() &&
                  calMonth === now.getMonth() &&
                  calYear === now.getFullYear();
                return (
                  <div
                    key={idx}
                    className={
                      "calendar-cell" + (isToday ? " calendar-today" : "")
                    }
                  >
                    {d || ""}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 12-hour card */}
      <div className="card time-card">
        <div className="card-label">12-Hour (AM/PM)</div>
        <div className="time-display">
          {h12}:{m}:{s} <span className="ampm-label">{ampm}</span>
        </div>
      </div>

      {/* 24-hour card */}
      <div className="card time-card">
        <div className="card-label">24-Hour</div>
        <div className="time-display">
          {h24}:{m}:{s}
        </div>
      </div>
    </div>
  );
}
