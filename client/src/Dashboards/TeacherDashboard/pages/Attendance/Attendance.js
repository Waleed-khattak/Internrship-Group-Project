import React, { useState, useEffect } from "react";
import "./Attendance.css";

const getAllClasses = () => {
  const stored = localStorage.getItem("classesData");
  return stored ? JSON.parse(stored) : [];
};

const getAllStudents = () => {
  const stored = localStorage.getItem("allStudents");
  return stored ? JSON.parse(stored) : [];
};

const TeacherAttendance = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [attendance, setAttendance] = useState([]);
  const [classes] = useState(getAllClasses);
  const allStudents = getAllStudents();

  const filteredStudents = allStudents.filter(
    (student) => student.class === selectedClass
  );

  const handleClassChange = (e) => {
    const cls = e.target.value;
    setSelectedClass(cls);

    // initialize attendance as "Present"
    setAttendance(
      allStudents
        .filter((student) => student.class === cls)
        .map((student) => ({
          studentId: student.id,
          status: "Present",
        }))
    );
  };

  const handleStatusChange = (studentId, status) => {
    setAttendance((prev) =>
      prev.map((item) =>
        item.studentId === studentId ? { ...item, status } : item
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedClass) return alert("Select a class first.");

    const storedData = JSON.parse(localStorage.getItem("attendanceData")) || {};

    const updatedData = {
      ...storedData,
      [selectedDate]: {
        ...(storedData[selectedDate] || {}),
        [selectedClass]: attendance,
      },
    };

    localStorage.setItem("attendanceData", JSON.stringify(updatedData));
    alert("Attendance marked successfully!");
  };

  return (
    <div className="attendance-page container" style={{ marginTop: '18px'}}>
      <h2>Teacher Attendance</h2>
      <form onSubmit={handleSubmit} className="attendance-form">
        <div className="form-row">
          <div className="form-group">
            <label>Select Class</label>
            <select value={selectedClass} onChange={handleClassChange} required>
              <option value="">Select a class</option>
              {classes.map((cls) => (
                <option key={cls.id} value={cls.name}>
                  {cls.name}
                </option>
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

        {selectedClass && filteredStudents.length > 0 && (
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
                  {filteredStudents.map((student) => {
                    const record = attendance.find(
                      (a) => a.studentId === student.id
                    );
                    return (
                      <tr key={student.id}>
                        <td>{student.rollNo}</td>
                        <td>{student.name}</td>
                        <td>
                          <div className="status-buttons">
                            {["Present", "Absent", "Late"].map((status) => (
                              <button
                                key={status}
                                type="button"
                                className={`status-btn ${
                                  record?.status === status ? "active" : ""
                                }`}
                                onClick={() =>
                                  handleStatusChange(student.id, status)
                                }
                              >
                                {status}
                              </button>
                            ))}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <button type="submit" className="btn-primary">
              Submit Attendance
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default TeacherAttendance;
