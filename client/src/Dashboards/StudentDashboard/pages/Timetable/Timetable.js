import React, { useState, useEffect } from "react";
import "./Timetable.css";

const StudentTimetable = () => {
  const [selectedClass, setSelectedClass] = useState("10th A");
  const [classes, setClasses] = useState([]);
  const [timetable, setTimetable] = useState([]);

  // Load timetable and classes from localStorage
  useEffect(() => {
    const storedTimetable = JSON.parse(localStorage.getItem("timetableData")) || [];
    setTimetable(storedTimetable);

    const storedClasses = JSON.parse(localStorage.getItem("classesData")) || [];
    setClasses(storedClasses.length ? storedClasses : ["10th A", "9th B", "8th C"]);
  }, []);

  // Filter timetable by selected class
  const filteredTimetable = timetable.filter(item => item.class === selectedClass);

  // Download timetable as CSV
  const handleDownload = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    filteredTimetable.forEach(day => {
      csvContent += `${day.day},,,\nTime,Subject,Teacher\n`;
      day.periods.forEach(period => {
        csvContent += `${period.time},${period.subject},${period.teacher || "-"}\n`;
      });
      csvContent += "\n";
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${selectedClass}-timetable.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="student-timetable-page">
      <h1 className="page-title">Class Timetable</h1>

      {/* Class Selector & Download */}
      <div className="class-selector">
        <label htmlFor="class-select">Select Class:</label>
        <select
          id="class-select"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          {classes.map((cls, idx) => (
            <option key={idx} value={cls.name || cls}>
              {cls.name || cls}
            </option>
          ))}
        </select>

        <button className="download-btn" onClick={handleDownload}>
          <i className="fas fa-download"></i> Download Timetable
        </button>
      </div>

      {/* Timetable Display */}
      <div className="timetable-wrapper">
        {filteredTimetable.length > 0 ? (
          filteredTimetable.map(daySchedule => (
            <div key={daySchedule.id} className="timetable-day-card">
              <h2 className="day-title">{daySchedule.day}</h2>
              <table className="timetable-table">
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Subject</th>
                    <th>Teacher</th>
                  </tr>
                </thead>
                <tbody>
                  {daySchedule.periods.map((period, idx) => (
                    <tr key={idx}>
                      <td>{period.time}</td>
                      <td>{period.subject}</td>
                      <td>{period.teacher || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))
        ) : (
          <div className="no-timetable">
            <p>No timetable found for <strong>{selectedClass}</strong>.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentTimetable;
