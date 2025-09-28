import React, { useState } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  //  student data
  const [user] = useState({
    name: 'Student User', 
    email: 'student@SmartDesk.com',
    isEmailVerified: true
  });

  return (
    <div className="dashboard-content">
      {/* Email Verification Alert */}
      {!user.isEmailVerified && (
        <div className="alert alert-warning">
          <i className="fas fa-exclamation-circle"></i>
          <span>
            Your email is not verified! We have sent you an email on {user.email}, kindly verify your email.
          </span>
        </div>
      )}

      {/* Student Dashboard Summary */}
      <div className="summary-card">
        <h2>Welcome back, {user.name} 🎓</h2>
        <p>Here’s a quick look at what you can do:</p>
        <ul>
          <li>👤 View Personal Profile</li>
          <li>📅 See Class Timetable</li>
          <li>📝 View Attendance & Attendance Percentage</li>
          <li>📂 Download/View Assignments</li>
          <li>📊 View Exam Results & Download Report Card (PDF)</li>
          <li>💰 View Fee Records (Paid / Unpaid)</li>
          <li>📢 Receive Announcements (Global / Class-based)</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
