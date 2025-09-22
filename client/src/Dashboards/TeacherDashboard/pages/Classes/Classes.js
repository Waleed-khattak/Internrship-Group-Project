import React, { useEffect, useState } from "react";
import './Classes.css';

export default function Classes() {
  const [teachers, setTeachers] = useState([]);
  const [currentTeacher, setCurrentTeacher] = useState("Mr. Ahmed Khan");

  useEffect(() => {
    const stored = localStorage.getItem("allTeachers");
    if (stored) {
      setTeachers(JSON.parse(stored));
    }
  }, []);

  // Current teacher ka data find karna
  const teacher = teachers.find(t => t.name === currentTeacher);
  
  // Current teacher ki classes get karna
  const teacherClasses = teacher 
    ? teacher.classes.split(",").map((c) => c.trim()) 
    : [];

  return (
    <div className="teacher-classes">
      {/* Page Header */}
      <div className="teacher-page-header">
        <h2>My Classes</h2>
      </div>

      {/* Content Card */}
      <div className="teacher-content-card">
        <div className="teacher-card-header">
          <h3>{currentTeacher} - Assigned Classes</h3>
        </div>
        
        <div className="teacher-card-body">
          {teacherClasses.length > 0 ? (
            <table className="teacher-classes-table">
              <thead>
                <tr>
                  <th>Class Name</th>
                  <th>Subject</th>
                  <th>Teacher</th>
                </tr>
              </thead>
              <tbody>
                {teacherClasses.map((cls, index) => (
                  <tr key={index}>
                    <td>{cls}</td>
                    <td>{teacher.subject}</td>
                    <td>{teacher.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="teacher-no-classes">
              <div className="icon">📚</div>
              <p>No classes assigned to {currentTeacher}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}