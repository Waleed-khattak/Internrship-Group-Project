import React, { useEffect, useState } from "react";
import "./Announcements.css";

const Announcements = () => {
  const [filterType, setFilterType] = useState("all");
  const [announcementsData, setAnnouncementsData] = useState([]);

  useEffect(() => {
    const storedAnnouncements = localStorage.getItem("announcements");
    if (storedAnnouncements) {
      setAnnouncementsData(JSON.parse(storedAnnouncements));
    }
  }, []);

  const filteredAnnouncements =
    filterType === "all"
      ? announcementsData
      : announcementsData.filter((announcement) => announcement.type === filterType);

  const getAnnouncementIcon = (type) => {
    if (type === "school") return "fas fa-school";
    if (type === "class") return "fas fa-users-class";
    return "fas fa-bullhorn";
  };

  const getAnnouncementType = (type) => {
    if (type === "school") return "School Wide";
    if (type === "class") return "Class Specific";
    return "General";
  };

  return (
    <div className="announcements-page">
      <h1 className="page-title">Announcements</h1>

      <div className="announcements-controls">
        <div className="filter-section">
          <label htmlFor="type-filter">Filter by Type:</label>
          <select
            id="type-filter"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Announcements</option>
            <option value="school">School Wide</option>
            <option value="class">Class Specific</option>
          </select>
        </div>
      </div>

      <div className="announcements-list">
        {filteredAnnouncements.map((announcement) => (
          <div key={announcement.id} className="announcement-card">
            <div className="announcement-header">
              <div className="announcement-icon">
                <i className={getAnnouncementIcon(announcement.type)}></i>
              </div>

              <div className="announcement-title-section">
                <h3 className="announcement-title">{announcement.title}</h3>
                <div className="announcement-meta">
                  <span className="announcement-date">
                    <i className="fas fa-calendar-alt"></i>
                    {announcement.date}
                  </span>
                  <span className="announcement-type">
                    <i className="fas fa-tag"></i>
                    {getAnnouncementType(announcement.type)}
                  </span>
                  {announcement.class && (
                    <span className="announcement-class">
                      <i className="fas fa-users"></i>
                      {announcement.class}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="announcement-content">
              <p>{announcement.content}</p>
            </div>

            <div className="announcement-footer">
              <div className="announcement-author">
                <i className="fas fa-user"></i>
                <span>Posted by: {announcement.author}</span>
              </div>

              <button className="view-details-btn">View Details</button>
            </div>
          </div>
        ))}
      </div>

      {filteredAnnouncements.length === 0 && (
        <div className="no-announcements">
          <i className="fas fa-bullhorn"></i>
          <p>No announcements found</p>
        </div>
      )}
    </div>
  );
};

export default Announcements;
