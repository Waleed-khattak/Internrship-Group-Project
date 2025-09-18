import React, { useState } from 'react';
import './DataTable.css';

const DataTable = () => {
  const [students, setStudents] = useState([
    { name: 'Ali Ahmed', class: '10th A', rollNo: '101', status: 'Active' },
    { name: 'Fatima Khan', class: '9th B', rollNo: '205', status: 'Active' },
    { name: 'Usman Ali', class: '8th C', rollNo: '312', status: 'Inactive' }
  ]);

  const handleEdit = (index) => {
    const student = students[index];
    alert(`Edit student: ${student.name}`);
    // You can open a modal or navigate to an edit page here
  };

  const handleDelete = (index) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      setStudents(prev => prev.filter((_, i) => i !== index));
    }
  };

  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Class</th>
          <th>Roll No</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student, index) => (
          <tr key={index}>
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
                <button className="btn-icon" onClick={() => handleEdit(index)}>
                  <i className="fas fa-edit"></i>
                </button>
                <button className="btn-icon" onClick={() => handleDelete(index)}>
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default DataTable;