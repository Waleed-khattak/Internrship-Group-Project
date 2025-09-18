import React, { useState } from 'react';
import './Announcements.css';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([
    { id: 1, title: 'School Holiday', content: 'School will remain closed on Friday for a public holiday.', date: '2023-10-05', target: 'All' },
    { id: 2, title: 'Exam Schedule', content: 'Mid-term exams will begin from next week. Please check the schedule.', date: '2023-10-03', target: 'Students' },
    { id: 3, title: 'Teacher Meeting', content: 'There will be a staff meeting tomorrow at 3 PM in the conference room.', date: '2023-10-01', target: 'Teachers' },
    { id: 4, title: 'Fee Submission', content: 'Last date for fee submission is 15th of this month.', date: '2023-09-28', target: 'Parents' }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    target: 'All',
    date: new Date().toISOString().split('T')[0]
  });

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
      id: announcements.length + 1,
      ...formData
    };
    setAnnouncements([newAnnouncement, ...announcements]);
    setFormData({ title: '', content: '', target: 'All', date: new Date().toISOString().split('T')[0] });
    setShowAddForm(false);
  };

  const handleDeleteAnnouncement = (id) => {
    setAnnouncements(announcements.filter(announcement => announcement.id !== id));
  };

  return (
    <div className="announcements-page">
      <div className="page-header">
        <h2>Announcements</h2>
        <button 
          className="btn-primary"
          onClick={() => setShowAddForm(true)}
        >
          <i className="fas fa-plus"></i> New Announcement
        </button>
      </div>

      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Create New Announcement</h3>
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
                <label>Target Audience</label>
                <select
                  name="target"
                  value={formData.target}
                  onChange={handleInputChange}
                >
                  <option value="All">Everyone</option>
                  <option value="Students">Students</option>
                  <option value="Teachers">Teachers</option>
                  <option value="Parents">Parents</option>
                </select>
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
                  Publish Announcement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="content-card">
        <div className="card-header">
          <h3>All Announcements</h3>
        </div>
        <div className="card-body">
          <div className="announcements-list">
            {announcements.map(announcement => (
              <div key={announcement.id} className="announcement-item">
                <div className="announcement-header">
                  <h4>{announcement.title}</h4>
                  <span className="announcement-target">{announcement.target}</span>
                </div>
                <p>{announcement.content}</p>
                <div className="announcement-footer">
                  <span className="announcement-date">{announcement.date}</span>
                  <div className="action-buttons">
                    <button className="btn-icon"><i className="fas fa-edit"></i></button>
                    <button className="btn-icon" onClick={() => handleDeleteAnnouncement(announcement.id)}>
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Announcements;