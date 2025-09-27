import React, { useEffect, useState } from "react";
import "./StatsCardStudent.css";

const StatsCardStudent = () => {
  const [stats, setStats] = useState({ title: "", value: "", icon: "", color: "" });

  useEffect(() => {
    const savedStats = localStorage.getItem("studentStats");
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }
  }, []);

  return (
    <div className="stats-card-student">
      <div className="stats-icon" style={{ backgroundColor: stats.color || "#ccc" }}>
        <i className={stats.icon || "fas fa-question"}></i>
      </div>
      <div className="stats-content">
        <h3 className="stats-value">{stats.value || "No Data"}</h3>
        <p className="stats-title">{stats.title || "No Data"}</p>
      </div>
    </div>
  );
};

export default StatsCardStudent;
