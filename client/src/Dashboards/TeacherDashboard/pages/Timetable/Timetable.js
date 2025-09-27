import React, { useState, useEffect } from 'react';
import './Timetable.css';

export default function TeacherTimetable() {
  const [teacherName, setTeacherName] = useState('Mr. Ahmed Khan');
  const [teacherTimeTable, setTeacherTimeTable] = useState([]);
  const [teachers, setTeachers] = useState([
    'Mr. Ahmed Khan',
    'Ms. Fatima Ali',
    'Mr. Usman Malik',
    'Ms. Ayesha Hassan',
    'Mr. Bilal Ahmed'
  ]);

  // Fetch timetable and filter by selected teacher
  useEffect(() => {
    const getTimetable = localStorage.getItem('timetableData');
    let allTimeTables = [];

    if (getTimetable) {
      try {
        allTimeTables = JSON.parse(getTimetable);
      } catch (e) {
        console.error("Invalid timetable data in localStorage", e);
        allTimeTables = [];
      }
    } else {
      // Default timetable if localStorage is empty
      allTimeTables = [
        {
          id: 1,
          class: '10th A',
          day: 'Monday',
          periods: [
            { time: '8:00-9:00', subject: 'Mathematics', teacher: 'Mr. Ahmed Khan' },
            { time: '9:00-10:00', subject: 'Physics', teacher: 'Ms. Ayesha Hassan' }
          ]
        }
      ];
    }

    const filtered = [];
    allTimeTables.forEach((timetable) => {
      if (timetable.periods && timetable.periods.length > 0) {
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
      }
    });

    setTeacherTimeTable(filtered);
  }, [teacherName]);

  return (
    <div className="teacher-timetable">
      {/* Page Header */}
      <div className="teacher-page-header">
        <h2>Teacher Timetable</h2>
      </div>

      {/* Teacher Selector */}
      <div className="teacher-selector">
        <label>Select Teacher:</label>
        <select value={teacherName} onChange={(e) => setTeacherName(e.target.value)}>
          {teachers.map((teacher, idx) => (
            <option key={idx} value={teacher}>
              {teacher}
            </option>
          ))}
        </select>
      </div>

      {/* Timetable Display */}
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
