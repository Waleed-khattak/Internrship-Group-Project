import React, { useState, useEffect } from 'react';
import './Announcements.css';

const Announcements = () => {
  const [allAnnouncements, setAllAnnouncements] = useState([]);
  const [teacherAnnouncements, setTeacherAnnouncements] = useState([]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    target: 'Students',
    date: new Date().toISOString().split('T')[0]
  });

  // Loading announcements from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("announcements");
    if (stored) {
      setAllAnnouncements(JSON.parse(stored));
    }
  }, []);

  const filteredAdminAnnouncements = allAnnouncements.filter(
    ann => ann.target === 'All' || ann.target === 'Teachers'
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAddAnnouncement = (e) => {
    e.preventDefault();
    const newAnnouncement = {
      id: teacherAnnouncements.length + 100,
      ...formData
    };
    const updated = [newAnnouncement, ...teacherAnnouncements];
    setTeacherAnnouncements(updated);

    localStorage.setItem("teacherAnnouncements", JSON.stringify(updated));

    setFormData({ title: '', content: '', target: 'Students', date: new Date().toISOString().split('T')[0] });
    setShowAddForm(false);
  };

  const handleDeleteAnnouncement = (id) => {
    const updated = teacherAnnouncements.filter(announcement => announcement.id !== id);
    setTeacherAnnouncements(updated);
    localStorage.setItem("teacherAnnouncements", JSON.stringify(updated));
  };

  useEffect(() => {
    const stored = localStorage.getItem("teacherAnnouncements");
    if (stored) {
      setTeacherAnnouncements(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="announcements-page">
      <div className="page-header">
        <h2>Teacher Announcements</h2>
        <button 
          className="btn-primary"
          onClick={() => setShowAddForm(true)}
        >
          <i className="fas fa-plus"></i> New Announcement (to Students)
        </button>
      </div>
      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Create Announcement for Students</h3>
              <button 
                className="close-btn"
                onClick={() => setShowAddForm(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={handleAddAnnouncement}>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Content</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  rows="4"
                  required
                ></textarea>
              </div>
              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-actions">
                <button type="button" onClick={() => setShowAddForm(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Publish to Students
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Admin Announcements(made for all and teacher) */}
      <div className="content-card">
        <div className="card-header">
          <h3>Admin Announcements (For Teachers)</h3>
        </div>
        <div className="card-body">
          <div className="announcements-list">
            {filteredAdminAnnouncements.map(announcement => (
              <div key={announcement.id} className="announcement-item">
                <div className="announcement-header">
                  <h4>{announcement.title}</h4>
                  <span className="announcement-target">{announcement.target}</span>
                </div>
                <p>{announcement.content}</p>
                <div className="announcement-footer">
                  <span className="announcement-date">{announcement.date}</span>
                </div>
              </div>
            ))}
            {filteredAdminAnnouncements.length === 0 && <p>No admin announcements available.</p>}
          </div>
        </div>
      </div>

      {/* Teacher Announcements */}
      <div className="content-card">
        <div className="card-header">
          <h3>My Announcements (to Students)</h3>
        </div>
        <div className="card-body">
          <div className="announcements-list">
            {teacherAnnouncements.map(announcement => (
              <div key={announcement.id} className="announcement-item">
                <div className="announcement-header">
                  <h4>{announcement.title}</h4>
                  <span className="announcement-target">{announcement.target}</span>
                </div>
                <p>{announcement.content}</p>
                <div className="announcement-footer">
                  <span className="announcement-date">{announcement.date}</span>
                  <div className="action-buttons">
                    <button className="btn-icon" onClick={() => handleDeleteAnnouncement(announcement.id)}>
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {teacherAnnouncements.length === 0 && <p>No announcements yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Announcements;
