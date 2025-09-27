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

const StudentAttendance = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [attendanceData, setAttendanceData] = useState({});
  const [classes] = useState(getAllClasses);
  const allStudents = getAllStudents();

  useEffect(() => {
    const stored = localStorage.getItem("attendanceData");
    if (stored) setAttendanceData(JSON.parse(stored));
  }, []);

  const filteredStudents = allStudents.filter(
    (student) => student.class === selectedClass
  );

  const attendanceRecords =
    (attendanceData[selectedDate] &&
      attendanceData[selectedDate][selectedClass]) ||
    [];

  return (
    <div className="attendance-page">
      <h2>Student Attendance</h2>
      <div className="form-row">
        <div className="form-group">
          <label>Select Class</label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
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
          />
        </div>
      </div>

      {selectedClass && filteredStudents.length > 0 && (
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
                const record = attendanceRecords.find(
                  (a) => a.studentId === student.id
                );
                return (
                  <tr key={student.id}>
                    <td>{student.rollNo}</td>
                    <td>{student.name}</td>
                    <td>{record?.status || "-"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StudentAttendance;
