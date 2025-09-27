import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TimetableCard.css';

const TimetableCard = () => {
  const navigate = useNavigate();
  const [timetable, setTimetable] = useState([]);

  useEffect(() => {
    const savedTimetable = localStorage.getItem("studentTimetable");
    if (savedTimetable) {
      setTimetable(JSON.parse(savedTimetable));
    }
  }, []);

  const handleViewFullSchedule = () => {
    navigate('/student/timetable');
  };

  return (
    <div className="timetable-card">
      <div className="card-header">
        <h3>Weekly Timetable</h3>
        <button className="view-all-btn" onClick={handleViewFullSchedule}>
          View Full Schedule
        </button>
      </div>
      
      <div className="timetable-content">
        {timetable.length > 0 ? (
          timetable.slice(0, 3).map((day, index) => (
            <div key={index} className="timetable-day">
              <div className="day-name">{day.day}</div>
              <div className="day-subjects">
                {day.subjects.slice(0, 3).map((subject, idx) => (
                  <span key={idx} className="subject-tag">{subject}</span>
                ))}
                {day.subjects.length > 3 && (
                  <span className="more-subjects">+{day.subjects.length - 3} more</span>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No timetable available</p>
        )}
      </div>
    </div>
  );
};

export default TimetableCard;
