import React from 'react';
import './ActivityFeed.css';

const ActivityFeed = () => {
  const activities = [
    { 
      icon: 'fas fa-user-plus', 
      text: 'New student Ali Ahmed registered', 
      time: '2 hours ago' 
    },
    { 
      icon: 'fas fa-money-bill-wave', 
      text: 'Fee submitted for Fatima Khan', 
      time: '5 hours ago' 
    },
    { 
      icon: 'fas fa-clipboard-check', 
      text: 'Attendance marked for Class 10A', 
      time: 'Yesterday' 
    },
    { 
      icon: 'fas fa-chalkboard-teacher', 
      text: 'New teacher Mr. Usman assigned to Class 9B', 
      time: '2 days ago' 
    }
  ];

  return (
    <ul className="activity-list">
      {activities.map((activity, index) => (
        <li key={index} className="activity-item">
          <div className="activity-icon">
            <i className={activity.icon}></i>
          </div>
          <div className="activity-content">
            <p>{activity.text}</p>
            <span className="activity-time">{activity.time}</span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ActivityFeed;