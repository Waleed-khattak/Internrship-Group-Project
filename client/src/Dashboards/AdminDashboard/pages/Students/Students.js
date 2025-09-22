import React, { useState } from 'react';
import './Students.css';

const Students = () => {
  const stored=localStorage.getItem("allStudents");
  const getAllStudents=stored?JSON.parse(stored):[{ id: 1, name: 'Ali Ahmed', class: '10th A', rollNo: '101', status: 'Active' },
    { id: 2, name: 'Fatima Khan', class: '9th B', rollNo: '205', status: 'Active' },
    { id: 3, name: 'Usman Ali', class: '8th C', rollNo: '312', status: 'Inactive' },
    { id: 4, name: 'Ayesha Malik', class: '11th A', rollNo: '415', status: 'Active' },
    { id: 5, name: 'Bilal Hassan', class: '7th B', rollNo: '523', status: 'Active' }];
    const [students,setStudents]=useState(getAllStudents);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    class: '',
    rollNo: '',
    status: 'Active'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAddStudent = (e) => {
    e.preventDefault();
    const newStudent = {
      id: students.length + 1,
      ...formData
    };
    const updatedStudents = [...students, newStudent];
  setStudents(updatedStudents);
  localStorage.setItem("allStudents", JSON.stringify(updatedStudents));
    setFormData({ name: '', class: '', rollNo: '', status: 'Active' });
    setShowAddForm(false);
  };

  const handleDeleteStudent = (id) => {
    setStudents(students.filter(student => student.id !== id));
  };

  return (
    <div className="students-page">
      <div className="page-header">
        <h2>Student Management</h2>
        <button 
          className="btn-primary"
          onClick={() => setShowAddForm(true)}
        >
          <i className="fas fa-plus"></i> Add New Student
        </button>
      </div>

      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Add New Student</h3>
              <button 
                className="close-btn"
                onClick={() => setShowAddForm(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={handleAddStudent}>
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
                <label>Class</label>
                <input
                  type="text"
                  name="class"
                  value={formData.class}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Roll Number</label>
                <input
                  type="text"
                  name="rollNo"
                  value={formData.rollNo}
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
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="form-actions">
                <button type="button" onClick={() => setShowAddForm(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Add Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="content-card">
        <div className="card-header">
          <h3>All Students</h3>
          <div className="search-box">
            <input type="text" placeholder="Search students..." />
            <i className="fas fa-search"></i>
          </div>
        </div>
        <div className="card-body">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Class</th>
                <th>Roll No</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.class}</td>
                  <td>{student.rollNo}</td>
                  <td>
                    <span className={`status ${student.status.toLowerCase()}`}>
                      {student.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-icon"><i className="fas fa-edit"></i></button>
                      <button 
                        className="btn-icon"
                        onClick={() => handleDeleteStudent(student.id)}
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

export default Students;