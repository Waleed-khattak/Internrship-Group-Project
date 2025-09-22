import React, { useState,useEffect } from 'react';
import './Teachers.css';

const Teachers = () => {
  const stored = localStorage.getItem("allTeachers");
  const [teachers, setTeachers] = useState(
    stored ? JSON.parse(stored) : [
      { id: 1, name: 'Mr. Ahmed Khan', subject: 'Mathematics', classes: '10th A, 9th B', status: 'Active' },
      { id: 2, name: 'Ms. Fatima Ali', subject: 'Science', classes: '11th A, 8th C', status: 'Active' },
      { id: 3, name: 'Mr. Usman Malik', subject: 'English', classes: '10th B, 7th A', status: 'Active' },
      { id: 4, name: 'Ms. Ayesha Hassan', subject: 'Physics', classes: '11th A, 12th A', status: 'Active' },
      { id: 5, name: 'Mr. Bilal Ahmed', subject: 'Computer Science', classes: '9th A, 10th C', status: 'Inactive' }
    ]
  );
  useEffect(() => {
    localStorage.setItem("allTeachers", JSON.stringify(teachers));
  }, [teachers]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    classes: '',
    status: 'Active'
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleAddTeacher = (e) => {
    e.preventDefault();
    const newTeacher = {
      id: teachers.length + 1,
      ...formData
    };
    setTeachers([...teachers, newTeacher]);
    setFormData({ name: '', subject: '', classes: '', status: 'Active' });
    setShowAddForm(false);
  };
  const handleDeleteTeacher = (id) => {
    setTeachers(teachers.filter(teacher => teacher.id !== id));
  };

  return (
    <div className="teachers-page">
      <div className="page-header">
        <h2>Teacher Management</h2>
        <button 
          className="btn-primary"
          onClick={() => setShowAddForm(true)}
        >
          <i className="fas fa-plus"></i> Add New Teacher
        </button>
      </div>

      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Add New Teacher</h3>
              <button 
                className="close-btn"
                onClick={() => setShowAddForm(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={handleAddTeacher}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Classes</label>
                <input
                  type="text"
                  name="classes"
                  value={formData.classes}
                  onChange={handleInputChange}
                  placeholder="e.g., 10th A, 9th B"
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
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="form-actions">
                <button type="button" onClick={() => setShowAddForm(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Add Teacher
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="content-card">
        <div className="card-header">
          <h3>All Teachers</h3>
          <div className="search-box">
            <input type="text" placeholder="Search teachers..." />
            <i className="fas fa-search"></i>
          </div>
        </div>
        <div className="card-body">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Subject</th>
                <th>Classes</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map(teacher => (
                <tr key={teacher.id}>
                  <td>{teacher.id}</td>
                  <td>{teacher.name}</td>
                  <td>{teacher.subject}</td>
                  <td>{teacher.classes}</td>
                  <td>
                    <span className={`status ${teacher.status.toLowerCase()}`}>
                      {teacher.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-icon"><i className="fas fa-edit"></i></button>
                      <button 
                        className="btn-icon"
                        onClick={() => handleDeleteTeacher(teacher.id)}
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

export default Teachers;