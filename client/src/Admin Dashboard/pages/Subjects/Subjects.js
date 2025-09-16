import React, { useState } from 'react';
import './Subjects.css';

const Subjects = () => {
  const [subjects, setSubjects] = useState([
    { id: 1, name: 'Mathematics', code: 'MATH101', classes: '10th A, 9th B', teacher: 'Mr. Ahmed Khan' },
    { id: 2, name: 'Science', code: 'SCI201', classes: '11th A, 8th C', teacher: 'Ms. Fatima Ali' },
    { id: 3, name: 'English', code: 'ENG301', classes: '10th B, 7th A', teacher: 'Mr. Usman Malik' },
    { id: 4, name: 'Physics', code: 'PHY401', classes: '11th A, 12th A', teacher: 'Ms. Ayesha Hassan' },
    { id: 5, name: 'Computer Science', code: 'CS501', classes: '9th A, 10th C', teacher: 'Mr. Bilal Ahmed' }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    classes: '',
    teacher: ''
  });

  const classes = ['10th A', '9th B', '8th C', '11th A', '7th B', '12th A', '10th B', '9th A', '10th C'];
  const teachers = ['Mr. Ahmed Khan', 'Ms. Fatima Ali', 'Mr. Usman Malik', 'Ms. Ayesha Hassan', 'Mr. Bilal Ahmed'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAddSubject = (e) => {
    e.preventDefault();
    const newSubject = {
      id: subjects.length + 1,
      ...formData
    };
    setSubjects([...subjects, newSubject]);
    setFormData({ name: '', code: '', classes: '', teacher: '' });
    setShowAddForm(false);
  };

  const handleDeleteSubject = (id) => {
    setSubjects(subjects.filter(subject => subject.id !== id));
  };

  return (
    <div className="subjects-page">
      <div className="page-header">
        <h2>Subject Management</h2>
        <button 
          className="btn-primary"
          onClick={() => setShowAddForm(true)}
        >
          <i className="fas fa-plus"></i> Add New Subject
        </button>
      </div>

      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Add New Subject</h3>
              <button 
                className="close-btn"
                onClick={() => setShowAddForm(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={handleAddSubject}>
              <div className="form-group">
                <label>Subject Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Subject Code</label>
                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Assigned Classes</label>
                <select
                  name="classes"
                  value={formData.classes}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Classes</option>
                  {classes.map(cls => (
                    <option key={cls} value={cls}>{cls}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Assigned Teacher</label>
                <select
                  name="teacher"
                  value={formData.teacher}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Teacher</option>
                  {teachers.map(teacher => (
                    <option key={teacher} value={teacher}>{teacher}</option>
                  ))}
                </select>
              </div>
              <div className="form-actions">
                <button type="button" onClick={() => setShowAddForm(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Add Subject
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: 'var(--color-6)' }}>
            <i className="fas fa-book" style={{ color: 'var(--primary-color-1)' }}></i>
          </div>
          <div className="stat-info">
            <h3>{subjects.length}</h3>
            <p>Total Subjects</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: 'rgba(24, 187, 155, 0.1)' }}>
            <i className="fas fa-chalkboard-teacher" style={{ color: '#18BB9B' }}></i>
          </div>
          <div className="stat-info">
            <h3>{new Set(subjects.map(s => s.teacher)).size}</h3>
            <p>Teachers Assigned</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: 'rgba(239, 173, 78, 0.1)' }}>
            <i className="fas fa-school" style={{ color: '#EFAD4E' }}></i>
          </div>
          <div className="stat-info">
            <h3>{new Set(subjects.flatMap(s => s.classes.split(', '))).size}</h3>
            <p>Classes Covered</p>
          </div>
        </div>
      </div>

      <div className="content-card">
        <div className="card-header">
          <h3>All Subjects</h3>
          <div className="search-box">
            <input type="text" placeholder="Search subjects..." />
            <i className="fas fa-search"></i>
          </div>
        </div>
        <div className="card-body">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Subject Name</th>
                <th>Code</th>
                <th>Classes</th>
                <th>Teacher</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map(subject => (
                <tr key={subject.id}>
                  <td>{subject.id}</td>
                  <td>{subject.name}</td>
                  <td>{subject.code}</td>
                  <td>{subject.classes}</td>
                  <td>{subject.teacher}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-icon"><i className="fas fa-edit"></i></button>
                      <button 
                        className="btn-icon"
                        onClick={() => handleDeleteSubject(subject.id)}
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

export default Subjects;