import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const auth = JSON.parse(localStorage.getItem("auth"));

  // Teacher user state
  const [teacherUser, setTeacherUser] = useState(() => {
    const authData = auth?.user;
    if (!authData)
      return {
        name: "Teacher User",
        email: "teacher@ilmimarkaz.com",
        isEmailVerified: false,
        _id: null,
      };
    return {
      ...authData,
      _id: authData._id || authData.id,
    };
  });

  const token = auth?.token;
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(true);

  // Dashboard additional states
  const [teacherData, setTeacherData] = useState(null);
  const [teacherClasses, setTeacherClasses] = useState([]);
  const [todaySchedule, setTodaySchedule] = useState([]);
  const [dashboardStats, setDashboardStats] = useState({
    totalStudents: { count: 0, trend: "+0", trendType: "stable" },
    totalClasses: { count: 0, trend: "stable", trendType: "stable" },
    todayPresent: { count: 0, trend: "0%", trendType: "stable" },
    avgPerformance: { count: "0%", trend: "0%", trendType: "stable" },
  });

  const [recentActivities] = useState([
    { id: 1, action: "Marked attendance for Class 9-A", time: "10 minutes ago", status: "completed" },
    { id: 2, action: "Added marks for Math Quiz", time: "2 hours ago", status: "completed" },
    { id: 3, action: "Posted announcement about exam schedule", time: "1 day ago", status: "sent" },
    { id: 4, action: "Created assignment: Algebra Problems", time: "2 days ago", status: "active" },
  ]);

  const quickActions = [
    { title: "Mark Attendance", icon: "fas fa-check-square", description: "Take today's attendance", color: "#2563eb", bgColor: "rgba(37, 99, 235, 0.1)", action: () => navigate("/teacher/attendance") },
    { title: "Grade Papers", icon: "fas fa-award", description: "12 pending submissions", color: "#059669", bgColor: "rgba(5, 150, 105, 0.1)", action: () => navigate("/teacher/exams") },
    { title: "Create Assignment", icon: "fas fa-file-alt", description: "Add new task for students", color: "#d97706", bgColor: "rgba(217, 119, 6, 0.1)", action: () => navigate("/teacher/assignments") },
    { title: "Send Announcement", icon: "fas fa-bullhorn", description: "Notify students & parents", color: "#dc2626", bgColor: "rgba(220, 38, 38, 0.1)", action: () => navigate("/teacher/announcements") },
  ];

  // Email verification
  const handleVerifyEmail = async () => {
    if (!teacherUser._id) {
      alert("❌ Teacher ID not found.");
      return;
    }
    try {
      await axios.post(`http://localhost:5000/api/verify/teacher/${teacherUser._id}`, {}, { headers: { Authorization: `Bearer ${token}` } });
      const updatedUser = { ...teacherUser, isEmailVerified: true };
      localStorage.setItem("auth", JSON.stringify({ ...auth, user: updatedUser }));
      setTeacherUser(updatedUser);
      setSuccessMsg("✅ Email verified successfully!");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      console.error("Error verifying email", err);
      alert("❌ Verification failed. Try again.");
    }
  };

  // Load dashboard data
  useEffect(() => {
    const loadTeacherData = () => {
      const storedTeachers = localStorage.getItem("allTeachers");
      let teacher;
      if (storedTeachers) {
        const teachers = JSON.parse(storedTeachers);
        teacher = teachers.find(t => t.name === teacherUser.name);
      } else {
        const sampleTeachers = [
          { id: 1, name: "Mr. Ahmed Khan", subject: "Mathematics", classes: "10th A,9th B", email: "ahmed.khan@school.edu", phone: "0321-1234567", experience: "5 years" },
        ];
        localStorage.setItem("allTeachers", JSON.stringify(sampleTeachers));
        teacher = sampleTeachers[0];
      }

      if (teacher) {
        setTeacherData(teacher);
        const classes = typeof teacher.classes === "string" ? teacher.classes.split(",").map(c => c.trim()) : teacher.classes;
        setTeacherClasses(classes);

        // Sample dashboard stats
        setDashboardStats({
          totalStudents: { count: 25, trend: "+5", trendType: "up" },
          totalClasses: { count: classes.length, trend: "stable", trendType: "stable" },
          todayPresent: { count: 23, trend: "92%", trendType: "up" },
          avgPerformance: { count: "87%", trend: "+2%", trendType: "up" },
        });

        // Sample today schedule
        const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
        const sampleSchedule = [
          { id: 1, time: "9:00 AM", class: "10th A", subject: "Mathematics", topic: "Math Class", status: "current" },
          { id: 2, time: "11:00 AM", class: "9th B", subject: "Mathematics", topic: "Math Class", status: "upcoming" },
        ];
        setTodaySchedule(sampleSchedule);
      }
      setTimeout(() => setLoading(false), 500);
    };

    loadTeacherData();
  }, [teacherUser.name]);

  const getCurrentTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  if (loading) return <div className="teacher-loading">Loading...</div>;

  return (
    <div className="teacher-dashboard container" style={{ paddingTop: "40px" }}>
      {/* Greeting */}
      <h1 className="page-title" style={{ marginBottom: "20px" }}>
        {getCurrentTimeGreeting()}, {teacherUser.name}!
      </h1>

      {/* Email Verification */}
      {!teacherUser.isEmailVerified && (
        <div className="alert alert-warning d-flex justify-content-between align-items-center">
          <span>Your email is not verified! We have sent you an email on {teacherUser.email}.</span>
          <button className="btn btn-primary" onClick={handleVerifyEmail}>✅ Verify Now</button>
        </div>
      )}
      {successMsg && <div className="alert alert-success">{successMsg}</div>}

      {/* Stats Overview */}
      <div className="teacher-stats-grid" style={{ marginTop: "30px" }}>
        {Object.entries(dashboardStats).map(([key, stat]) => (
          <div key={key} className="teacher-stats-card">
            <h3>{stat.count}</h3>
            <p>{key.replace(/([A-Z])/g, ' $1')}</p>
            <span className={`trend ${stat.trendType}`}>{stat.trend}</span>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="teacher-content-card" style={{ marginTop: "30px" }}>
        <h3>Quick Actions</h3>
        <div className="teacher-quick-actions-grid">
          {quickActions.map((action, i) => (
            <button key={i} onClick={action.action} className="quick-action-btn" style={{ background: action.bgColor, borderColor: action.color }}>
              <i className={action.icon}></i>
              <div>
                <strong>{action.title}</strong>
                <p>{action.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activities and Today's Schedule */}
      <div className="teacher-dashboard-row" style={{ marginTop: "30px" }}>
        {/* Recent Activities */}
        <div className="teacher-content-card">
          <h3>Recent Activities</h3>
          {recentActivities.map(act => (
            <div key={act.id} className="teacher-activity-item">
              <p>{act.action}</p>
              <span>{act.time}</span>
              <span className={`activity-status ${act.status}`}>{act.status}</span>
            </div>
          ))}
        </div>

        {/* Today's Schedule */}
        <div className="teacher-content-card">
          <h3>Today's Schedule</h3>
          {todaySchedule.length > 0 ? todaySchedule.map(item => (
            <div key={item.id} className={`teacher-schedule-item ${item.status}`}>
              <strong>{item.time}</strong>
              <p>{item.class} - {item.subject}</p>
              <span>{item.topic}</span>
            </div>
          )) : <p>No classes scheduled for today</p>}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
