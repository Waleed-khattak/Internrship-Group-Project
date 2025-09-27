import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AnnouncementCard.css";

const AnnouncementCard = () => {
  const navigate = useNavigate();
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const storedAnnouncements = localStorage.getItem("announcements");
    if (storedAnnouncements) {
      setAnnouncements(JSON.parse(storedAnnouncements));
    }
  }, []);

  const handleViewAll = () => {
    navigate("/student/announcements");
  };

  const recentAnnouncements = announcements.slice(0, 3);

  return (
    <div className="announcement-card">
      <div className="card-header">
        <h3>Recent Announcements</h3>
        <button className="view-all-btn" onClick={handleViewAll}>
          View All
        </button>
      </div>

      <div className="announcements-list">
        {recentAnnouncements.length === 0 ? (
          <p>No announcements available</p>
        ) : (
          recentAnnouncements.map((announcement) => (
            <div key={announcement.id} className="announcement-item">
              <div className="announcement-header">
                <h4 className="announcement-title">{announcement.title}</h4>
                <span className="announcement-date">
                  {new Date(announcement.date).toLocaleDateString()}
                </span>
              </div>
              <p className="announcement-content">{announcement.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AnnouncementCard;
