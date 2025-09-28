import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import SidebarStudent from "./components/SidebarStudent/SidebarStudent";
import Header from "../../components/DashboardHeader";
import Dashboard from "./pages/Dashboard/Dashboard";
import Timetable from "./pages/Timetable/Timetable";
import Attendance from "./pages/Attendance/Attendance";
import Assignments from "./pages/Assignments/Assignments";
import Results from "./pages/Results/Results";
import Fees from "./pages/Fees/Fees";
import Announcements from "./pages/Announcements/Announcements";
import Profile from "./pages/Profile/Profile";
import EditProfile from "../../components/EditProfile";
import "./styles/App.css"; 

function StudentApp() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const auth = JSON.parse(localStorage.getItem("auth"));
  const studentUser = auth?.user
    ? { 
        ...auth.user, 
        role: auth.user.role || "Student" 
      }
    : null;

  const token = auth?.token;

  if (!studentUser || !token) {
    return <div>Please login first</div>;
  }

  return (
    <div className="student-app">
      <SidebarStudent sidebarOpen={sidebarOpen} onToggleSidebar={toggleSidebar} />
      <div className="student-main">
        <Header onToggleSidebar={toggleSidebar} user={studentUser} />
        <div className="student-content">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/timetable" element={<Timetable />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/assignments" element={<Assignments />} />
            <Route path="/results" element={<Results />} />
            <Route path="/fees" element={<Fees />} />
            <Route path="/announcements" element={<Announcements />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/editprofile" element={<EditProfile />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default StudentApp;
