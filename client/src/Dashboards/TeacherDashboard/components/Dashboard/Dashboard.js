import React, { useState } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  // Dummy teacher data
  const [user] = useState({
    name: 'Teacher User',
    email: 'teacher@ilmimarkaz.com',
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

      {/* Teacher Dashboard Summary */}
      <div className="summary-card">
        <h2>Welcome back, {user.name} 👋</h2>
        <p>Here’s a quick look at your tasks:</p>
        <ul>
          <li>📌 View Assigned Classes & Timetable</li>
          <li>📝 Mark Attendance (Present / Absent / Late)</li>
          <li>📂 Upload Assignments (Text / File link)</li>
          <li>✍️ Enter Exam/Test Marks (Submit for Admin approval)</li>
          <li>📢 Post Announcements for Classes</li>
          <li>📊 View Attendance/Results Summary</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
