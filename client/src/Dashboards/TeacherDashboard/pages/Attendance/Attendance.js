import React, { useState } from 'react';
import './Attendance.css';

const Attendance = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendance, setAttendance] = useState([]);

  const classes = ['10th A', '9th B', '8th C', '11th A', '7th B'];
  const students = [
    { id: 1, name: 'Ali Ahmed', rollNo: '101' },
    { id: 2, name: 'Fatima Khan', rollNo: '205' },
    { id: 3, name: 'Usman Ali', rollNo: '312' },
    { id: 4, name: 'Ayesha Malik', rollNo: '415' },
    { id: 5, name: 'Bilal Hassan', rollNo: '523' }
  ];

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
    // In a real app, you would fetch students for the selected class
    setAttendance(students.map(student => ({
      studentId: student.id,
      status: 'Present'
    })));
  };

  const handleStatusChange = (studentId, status) => {
    setAttendance(prev => prev.map(item =>
      item.studentId === studentId ? { ...item, status } : item
    ));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would submit attendance to the server
    console.log('Attendance submitted:', {
      class: selectedClass,
      date: selectedDate,
      attendance
    });
    alert('Attendance marked successfully!');
  };

  return (
    <div className="attendance-page">
      <div className="page-header">
        <h2>Attendance Management</h2>
      </div>

      <div className="content-card">
        <div className="card-header">
          <h3>Mark Attendance</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit} className="attendance-form">
            <div className="form-row">
              <div className="form-group">
                <label>Select Class</label>
                <select value={selectedClass} onChange={handleClassChange} required>
                  <option value="">Select a class</option>
                  {classes.map(cls => (
                    <option key={cls} value={cls}>{cls}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  required
                />
              </div>
            </div>

            {selectedClass && (
              <>
                <div className="attendance-table-container">
                  <table className="attendance-table">
                    <thead>
                      <tr>
                        <th>Roll No</th>
                        <th>Student Name</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map(student => {
                        const attendanceRecord = attendance.find(a => a.studentId === student.id);
                        return (
                          <tr key={student.id}>
                            <td>{student.rollNo}</td>
                            <td>{student.name}</td>
                            <td>
                              <div className="status-buttons">
                                <button
                                  type="button"
                                  className={`status-btn ${attendanceRecord?.status === 'Present' ? 'active' : ''}`}
                                  onClick={() => handleStatusChange(student.id, 'Present')}
                                >
                                  Present
                                </button>
                                <button
                                  type="button"
                                  className={`status-btn ${attendanceRecord?.status === 'Absent' ? 'active' : ''}`}
                                  onClick={() => handleStatusChange(student.id, 'Absent')}
                                >
                                  Absent
                                </button>
                                <button
                                  type="button"
                                  className={`status-btn ${attendanceRecord?.status === 'Late' ? 'active' : ''}`}
                                  onClick={() => handleStatusChange(student.id, 'Late')}
                                >
                                  Late
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn-primary">
                    Submit Attendance
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>

      <div className="content-card">
        <div className="card-header">
          <h3>Attendance Reports</h3>
        </div>
        <div className="card-body">
          <div className="report-filters">
            <div className="form-group">
              <label>Select Class</label>
              <select>
                <option value="">All Classes</option>
                {classes.map(cls => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Month</label>
              <select>
                <option value="">Select Month</option>
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option> 
                </select>
            </div>
            <div className="form-group">
              <label>Year</label>
              <select>
                <option value="">Select Year</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                </select>
            </div>
            <div className="form-actions">
              <button type="button" className="btn-secondary">
                Generate Report
                </button>
            </div>
            </div>
            </div>
        </div>
    </div>
    );
};
export default Attendance;