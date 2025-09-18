import React, { useState } from 'react';
import './Exams.css';

const Exams = () => {
  const [exams, setExams] = useState([
    { id: 1, name: 'Mid-Term Exams', class: '10th A', subject: 'Mathematics', date: '2023-10-15', status: 'Scheduled' },
    { id: 2, name: 'Final Exams', class: '9th B', subject: 'Science', date: '2023-12-05', status: 'Scheduled' },
    { id: 3, name: 'Unit Test', class: '8th C', subject: 'English', date: '2023-09-20', status: 'Completed' },
    { id: 4, name: 'Quarterly Exams', class: '11th A', subject: 'Physics', date: '2023-11-10', status: 'Scheduled' }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    class: '',
    subject: '',
    date: '',
    status: 'Scheduled'
  });

  const classes = ['10th A', '9th B', '8th C', '11th A', '7th B'];
  const subjects = ['Mathematics', 'Science', 'English', 'Physics', 'Computer Science'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAddExam = (e) => {
    e.preventDefault();
    const newExam = {
      id: exams.length + 1,
      ...formData
    };
    setExams([...exams, newExam]);
    setFormData({ name: '', class: '', subject: '', date: '', status: 'Scheduled' });
    setShowAddForm(false);
  };

  const handleDeleteExam = (id) => {
    setExams(exams.filter(exam => exam.id !== id));
  };

  return (
    <div className="exams-page">
      <div className="page-header">
        <h2>Exam Management</h2>
        <button 
          className="btn-primary"
          onClick={() => setShowAddForm(true)}
        >
          <i className="fas fa-plus"></i> Schedule New Exam
        </button>
      </div>

      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Schedule New Exam</h3>
              <button 
                className="close-btn"
                onClick={() => setShowAddForm(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={handleAddExam}>
              <div className="form-group">
                <label>Exam Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Class</label>
                <select
                  name="class"
                  value={formData.class}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Class</option>
                  {classes.map(cls => (
                    <option key={cls} value={cls}>{cls}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Subject</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Subject</option>
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
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
              <div className="form-group">
                <label>Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option value="Scheduled">Scheduled</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              <div className="form-actions">
                <button type="button" onClick={() => setShowAddForm(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Schedule Exam
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="content-card">
        <div className="card-header">
          <h3>Exam Schedule</h3>
          <div className="search-box">
            <input type="text" placeholder="Search exams..." />
            <i className="fas fa-search"></i>
          </div>
        </div>
        <div className="card-body">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Exam Name</th>
                <th>Class</th>
                <th>Subject</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {exams.map(exam => (
                <tr key={exam.id}>
                  <td>{exam.id}</td>
                  <td>{exam.name}</td>
                  <td>{exam.class}</td>
                  <td>{exam.subject}</td>
                  <td>{exam.date}</td>
                  <td>
                    <span className={`status ${exam.status.toLowerCase()}`}>
                      {exam.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-icon"><i className="fas fa-edit"></i></button>
                      <button 
                        className="btn-icon"
                        onClick={() => handleDeleteExam(exam.id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Exams;