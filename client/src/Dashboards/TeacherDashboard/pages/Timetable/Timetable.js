import React, { useState, useEffect } from 'react';
import './Timetable.css';

export default function Timetable() {
  const [teacherName, setTeacherName] = useState('Mr. Ahmed Khan');
  const [teacherTimeTable, setTeacherTimeTable] = useState([]);

  useEffect(() => {
    // localStorage se pura timetable nikal hai
    const getTimetable = localStorage.getItem('timetableData');
    if (getTimetable) {
      const allTimeTables = JSON.parse(getTimetable);

      // Filter teacher-specific data
      const filtered = [];

      allTimeTables.forEach((timetable) => {
        timetable.periods.forEach((period) => {
          if (period.teacher && period.teacher.trim().toLowerCase() === teacherName.trim().toLowerCase()) {
            filtered.push({
              class: timetable.class,
              day: timetable.day,
              time: period.time,
              subject: period.subject,
              teacher: period.teacher
            });
          }
        });
      });

      setTeacherTimeTable(filtered);
    }
  }, [teacherName]);

  const teachers = ['Mr. Ahmed Khan', 'Ms. Fatima Ali', 'Mr. Usman Malik', 'Ms. Ayesha Hassan', 'Mr. Bilal Ahmed'];

  return (
    <div className="teacher-timetable">
      {/* Page Header */}
      <div className="teacher-page-header">
        <h2>Teacher Timetable</h2>
        {/* 
        <div className="teacher-filter">
          <label>Select Teacher:</label>
          <select 
            value={teacherName} 
            onChange={(e) => setTeacherName(e.target.value)}
          >
            {teachers.map(teacher => (
              <option key={teacher} value={teacher}>{teacher}</option>
            ))}
          </select>
        </div> 
        */}
      </div>

      {/* Content Card */}
      <div className="teacher-content-card">
        <div className="teacher-card-header">
          <h3>{teacherName} - Weekly Schedule</h3>
        </div>
        
        <div className="teacher-card-body">
          {teacherTimeTable.length > 0 ? (
            <table className="teacher-timetable-table">
              <thead>
                <tr>
                  <th>Class</th>
                  <th>Day</th>
                  <th>Time</th>
                  <th>Subject</th>
                </tr>
              </thead>
              <tbody>
                {teacherTimeTable.map((entry, index) => (
                  <tr key={index}>
                    <td>{entry.class}</td>
                    <td>{entry.day}</td>
                    <td>{entry.time}</td>
                    <td>{entry.subject}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="teacher-no-timetable">
              <div className="icon">📅</div>
              <p>No timetable found for {teacherName}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}