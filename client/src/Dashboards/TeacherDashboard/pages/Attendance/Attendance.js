import React, { useState } from 'react';
import './Attendance.css';

const getAllClasses = () => {
  const stored = localStorage.getItem("classesData");
  return stored ? JSON.parse(stored) : [];
};

const getAllStudents = () => {
  const stored = localStorage.getItem("allStudents");
  return stored ? JSON.parse(stored) : [];
};

const Attendance = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendance, setAttendance] = useState([]);
  const [classes] = useState(getAllClasses);
  const allStudents = getAllStudents();

  // filter students for selected class
  const filteredStudents = allStudents.filter(
    student => student.class === selectedClass
  );

  const handleClassChange = (e) => {
    const cls = e.target.value;
    setSelectedClass(cls);

    // default attendance "Present"
    setAttendance(
      allStudents
        .filter(student => student.class === cls)
        .map(student => ({
          studentId: student.id,
          status: 'Present'
        }))
    );
  };

  const handleStatusChange = (studentId, status) => {
    setAttendance(prev =>
      prev.map(item =>
        item.studentId === studentId ? { ...item, status } : item
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
                    <option key={cls.id} value={cls.name}>{cls.name}</option>
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
                      {filteredStudents.map(student => {
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
    </div>
  );
};

export default Attendance;
