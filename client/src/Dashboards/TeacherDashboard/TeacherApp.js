import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../../Components/DashboardSideBar';
import Header from '../../Components/DashboardHeader';
import Dashboard from './components/Dashboard/Dashboard';
import Classes from './pages/Classes/Classes';
import Timetable from './pages/Timetable/Timetable';
import Attendance from './pages/Attendance/Attendance';
import Exams from './pages/Exams/Exams';
import Announcements from './pages/Announcements/Announcements';
import EditProfile from '../../Components/EditProfile';
import './styles/App.css';
import Assignments from './pages/Assignments/Assignments';

function TeacherApp() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const auth = JSON.parse(localStorage.getItem("auth"));
  const teacherUser = auth?.user;
  if (!teacherUser) {
    return <div>Please login first</div>;
  }

  return (
    <div className="dashboard-container"> 
      <Sidebar isOpen={sidebarOpen} role={teacherUser?.role} />
      <div className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <Header onToggleSidebar={toggleSidebar} user={teacherUser} />
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="classes" element={<Classes />} />
          <Route path="timetable" element={<Timetable />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="assignments" element={<Assignments />} />
          <Route path="exams" element={<Exams />} />
          <Route path="announcements" element={<Announcements />} />
          <Route path="editprofile" element={<EditProfile />} />
        </Routes>
      </div>
    </div>
  );
}

export default TeacherApp;
