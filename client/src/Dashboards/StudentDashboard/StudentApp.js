import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../../Components/DashboardSideBar';
import Header from '../../Components/DashboardHeader';
import Timetable from './pages/Timetable/Timetable';
import Announcements from './pages/Announcements/Announcements';
import EditProfile from '../../Components/EditProfile';
import './styles/App.css';

function StudentApp() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const auth = JSON.parse(localStorage.getItem("auth"));
  const studentUser = auth?.user;
  const token = auth?.token;

  if (!studentUser) {
    return <div>Please login first</div>;
  }


  return (
   <>
    <div className="dashboard-container">
      <Sidebar isOpen={sidebarOpen} role={studentUser?.role} />
      <div className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <Header onToggleSidebar={toggleSidebar} user={studentUser} />
        <Routes>
          <Route path="timetable" element={<Timetable />} />
          {/* <Route path="attendance" element={<Attendance />} /> */}
          {/* <Route path="assignments" element={<Assignments />} /> */}
          {/* <Route path="results" element={<Results />} />   */}
          {/* <Route path="fees" element={<Fees />} /> */}
          <Route path="announcements" element={<Announcements />} />
          <Route path="editprofile" element={<EditProfile />} />
        </Routes>
      </div>
    </div>

    <h1
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    top: "-700%",
    transform: "translateY(-700%)",
    margin: 0,
  }}
>
  {studentUser.name}
</h1>

   </>
       
  );
}

export default StudentApp;
