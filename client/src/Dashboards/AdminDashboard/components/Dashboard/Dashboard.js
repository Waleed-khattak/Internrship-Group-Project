
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import StatsCard from "../StatsCard/StatsCard";
import DataTable from "../DataTable/DataTable";
import QuickActions from "../QuickActions/QuickActions";
import ActivityFeed from "../ActivityFeed/ActivityFeed";
import AttendanceChart from "../AttendanceChart/AttendanceChart";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  // ✅ Get admin info from localStorage
  const auth = JSON.parse(localStorage.getItem("auth"));

  const [adminUser, setAdminUser] = useState(() => {
    const authData = auth?.user;
    if (!authData)
      return {
        name: "Admin User",
        email: "admin@ilmimarkaz.com",
        isEmailVerified: false,
        _id: null,
      };

    // ✅ Ensure we have _id for API requests
    return {
      ...authData,
      _id: authData._id || authData.id,
    };
  });

  const [successMsg, setSuccessMsg] = useState("");
  const token = auth?.token;

  // ✅ Fake email verification for admin
  const handleVerifyEmail = async () => {
    if (!adminUser._id) {
      alert("❌ Admin ID not found.");
      return;
    }

    try {
      // Fake verification API call (or real API if implemented)
      await axios.post(
        `http://localhost:5000/api/verify/admin/${adminUser._id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updatedUser = { ...adminUser, isEmailVerified: true };

      // Save updated user back to localStorage
      localStorage.setItem("auth", JSON.stringify({ ...auth, user: updatedUser }));
      setAdminUser(updatedUser);
      setSuccessMsg("✅ Email verified successfully!");

      // Hide success message after 3 seconds
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      console.error("Error verifying email", err);
      alert("❌ Verification failed. Try again.");
    }
  };

  return (
    <div className="admin-dashboard container">
      <h1 className="page-title" style={{marginTop: '20px'}}>Admin Dashboard</h1>

      {/* Email Verification Alert */}
      {!adminUser.isEmailVerified && (
        <div className="alert alert-warning d-flex justify-content-between align-items-center">
          <span>
            Your email is not verified! We have sent you an email on {adminUser.email}.
          </span>
          <button className="btn btn-primary" onClick={handleVerifyEmail}>
            ✅ Verify Now
          </button>
        </div>
      )}

      {/* Success Alert */}
      {successMsg && <div className="alert alert-success">{successMsg}</div>}

      {/* Stats Section */}
      <div className="stats-grid">
        <StatsCard
          icon="fas fa-user-graduate"
          value="1,250"
          label="Total Students"
          iconBgColor="var(--color-6)"
          iconColor="var(--primary-color-1)"
        />
        <StatsCard
          icon="fas fa-chalkboard-teacher"
          value="45"
          label="Total Teachers"
          iconBgColor="rgba(24, 187, 155, 0.1)"
          iconColor="#18BB9B"
        />
        <StatsCard
          icon="fas fa-school"
          value="24"
          label="Total Classes"
          iconBgColor="rgba(239, 173, 78, 0.1)"
          iconColor="#EFAD4E"
        />
        <StatsCard
          icon="fas fa-money-bill-wave"
          value="92%"
          label="Fee Collection Rate"
          iconBgColor="rgba(233, 87, 87, 0.1)"
          iconColor="#E95757"
        />
      </div>

      {/* Main Content Area */}
      <div className="content-grid">
        <div className="content-card">
          <div className="card-header">
            <h3>Recent Students</h3>
            <Link to="/admin/students" className="view-all">
              View All
            </Link>
          </div>
          <div className="card-body">
            <DataTable />
          </div>
        </div>

        <div className="content-card">
          <div className="card-header">
            <h3>Quick Actions</h3>
          </div>
          <div className="card-body">
            <QuickActions />
          </div>
        </div>

        <div className="content-card">
          <div className="card-header">
            <h3>Recent Activities</h3>
          </div>
          <div className="card-body">
            <ActivityFeed />
          </div>
        </div>

        <div className="content-card">
          <div className="card-header">
            <h3>Attendance Overview</h3>
          </div>
          <div className="card-body">
            <AttendanceChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
 