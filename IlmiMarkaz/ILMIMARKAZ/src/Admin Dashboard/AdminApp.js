import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header Admin/Header Admin';
import Dashboard from './components/Dashboard/Dashboard';
import Students from './pages/Students/Students';
import Teachers from './pages/Teachers/Teachers';
import Classes from './pages/Classes/Classes';
import Subjects from './pages/Subjects/Subjects';
import Timetable from './pages/Timetable/Timetable';
import Attendance from './pages/Attendance/Attendance';
import Exams from './pages/Exams/Exams';
import Fees from './pages/Fees/Fees';
import Announcements from './pages/Announcements/Announcements';
import Analytics from './pages/Analytics/Analytics';
import EditProfile from './pages/EditProfile/EditProfile';
import '../styles/App.css';

function AdminApp() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="dashboard-container">
      <Sidebar isOpen={sidebarOpen} />
      <div className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <Header onToggleSidebar={toggleSidebar} />
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="students" element={<Students />} />
          <Route path="teachers" element={<Teachers />} />
          <Route path="classes" element={<Classes />} />
          <Route path="subjects" element={<Subjects />} />
          <Route path="timetable" element={<Timetable />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="exams" element={<Exams />} />
          <Route path="fees" element={<Fees />} />
          <Route path="announcements" element={<Announcements />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="editprofile" element={<EditProfile />} />
        </Routes>
      </div>
    </div>
  );
}

export default AdminApp;