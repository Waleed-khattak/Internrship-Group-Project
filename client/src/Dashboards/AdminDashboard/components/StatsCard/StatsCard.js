import React from 'react';
import './StatsCard.css';

const StatsCard = ({ icon, value, label, iconBgColor, iconColor }) => {
  return (
    <div className="stat-card">
      <div className="stat-icon" style={{ backgroundColor: iconBgColor }}>
        <i className={icon} style={{ color: iconColor }}></i>
      </div>
      <div className="stat-info">
        <h3>{value}</h3>
        <p>{label}</p>
      </div>
    </div>
  );
};

export default StatsCard;