
import React, { useState } from "react";
import axios from "axios";
import StatsCardStudent from "../../components/StatsCardStudent/StatsCardStudent";
import TimetableCard from "../../components/TimetableCard/TimetableCard";
import AssignmentCard from "../../components/AssignmentCard/AssignmentCard";
import AnnouncementCard from "../../components/AnnouncementCard/AnnouncementCard";
import FeeStatusCard from "../../components/FeeStatusCard/FeeStatusCard";
import "./Dashboard.css";

const Dashboard = () => {
  // ✅ Get auth info from localStorage
  const auth = JSON.parse(localStorage.getItem("auth"));

  // ✅ Initialize studentUser state
  const [studentUser, setStudentUser] = useState(() => {
    const authData = auth?.user;
    if (!authData)
      return {
        name: "Student User",
        email: "student@ilmimarkaz.com",
        isEmailVerified: false,
        _id: null,
      };

    return {
      ...authData,
      _id: authData._id || authData.id, // ensure _id is present
    };
  });

  const [successMsg, setSuccessMsg] = useState(""); // for green alert

  const token = auth?.token;

  // ✅ Dashboard data
  const statsData = JSON.parse(localStorage.getItem("studentStats")) || [];
  const timetableData = JSON.parse(localStorage.getItem("studentTimetable")) || [];
  const assignmentsData = JSON.parse(localStorage.getItem("assignments")) || [];
  const announcementsData = JSON.parse(localStorage.getItem("announcements")) || [];
  const feeStatusData = JSON.parse(localStorage.getItem("feeStatus")) || {
    status: "",
    dueDate: "",
    amount: "",
  };

  // ✅ Email verification function
  const handleVerifyEmail = async () => {
    if (!studentUser._id) {
      alert("❌ User ID not found.");
      return;
    }

    try {
      // Fake verification API call
      const res = await axios.post(
        `http://localhost:5000/api/verify/student/${studentUser._id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // For testing, we'll toggle isEmailVerified
      const updatedUser = { ...studentUser, isEmailVerified: true };

      // ✅ Save updated user to localStorage
      localStorage.setItem(
        "auth",
        JSON.stringify({ ...auth, user: updatedUser })
      );

      // ✅ Update state
      setStudentUser(updatedUser);
      setSuccessMsg("✅ Email verified successfully!");

      // ✅ Clear success message after 3 seconds
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      console.error("Error verifying email", err);
      alert("❌ Verification failed. Try again.");
    }
  };

  return (
    <div className="student-dashboard">
      <h1 className="page-title">Student Dashboard</h1>

      {/* Email Verification Alert */}
      {!studentUser.isEmailVerified && (
        <div className="alert alert-warning">
          <i className="fas fa-exclamation-circle"></i>
          <span>
            Your email is not verified! We have sent you an email on {studentUser.email}.
          </span>
          <button className="btn btn-primary" onClick={handleVerifyEmail}>
            ✅ Verify Now
          </button>
        </div>
      )}

      {/* Success Message */}
      {successMsg && (
        <div className="alert alert-success">
          {successMsg}
        </div>
      )}

      {/* Welcome Message */}
      <div className="summary-card">
        <h2>Welcome back, {studentUser.name} 🎓</h2>
        <p>Here’s a quick look at your dashboard:</p>
      </div>

      {/* Stats Section */}
      <div className="stats-grid">
        {statsData.length > 0 ? (
          statsData.map((stat, index) => (
            <StatsCardStudent
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              color={stat.color}
            />
          ))
        ) : (
          <p className="no-data">No statistics found</p>
        )}
      </div>

      <div className="dashboard-content">
        <div className="content-left">
          {/* Timetable Section */}
          {timetableData.length > 0 ? (
            <TimetableCard data={timetableData} />
          ) : (
            <p className="no-data">No timetable found</p>
          )}

          {/* Fee Status Section */}
          {feeStatusData.status ? (
            <FeeStatusCard
              status={feeStatusData.status}
              dueDate={feeStatusData.dueDate}
              amount={feeStatusData.amount}
            />
          ) : (
            <p className="no-data">No fee status available</p>
          )}
        </div>

        <div className="content-right">
          {/* Assignments Section */}
          {assignmentsData.length > 0 ? (
            <AssignmentCard assignments={assignmentsData} />
          ) : (
            <p className="no-data">No assignments found</p>
          )}

          {/* Announcements Section */}
          {announcementsData.length > 0 ? (
            <AnnouncementCard announcements={announcementsData} />
          ) : (
            <p className="no-data">No announcements found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
