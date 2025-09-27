import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HeaderStudent.css";

const HeaderStudent = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [studentName, setStudentName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedStudent = localStorage.getItem("student");
    if (storedStudent) {
      const { name } = JSON.parse(storedStudent);
      setStudentName(name);
    }
  }, []);

  const ViewProfile = () => {
    navigate("/student/profile");
  };

  const handleLogout = () => {
    localStorage.removeItem("student"); // clear stored student data
    navigate("/login"); // go back to login page
  };

  return (
    <header className="student-header">
      <div className="header-left">
        <h1 className="page-title">Student Dashboard</h1>
      </div>
      
      <div className="header-right">
        <div className="notification-icon">
          <i className="fas fa-bell"></i>
          <span className="notification-badge">3</span>
        </div>
        
        <div className="user-profile" onClick={() => setIsProfileOpen(!isProfileOpen)}>
          <div className="avatar">
            <img 
              src={`https://ui-avatars.com/api/?name=${studentName || "Student"}&background=0E59F2&color=fff`} 
              alt="Student" 
            />
          </div>
          <span className="user-name">{studentName || "Guest"}</span>
          <i className="fas fa-chevron-down"></i>
          
          {isProfileOpen && (
            <div className="profile-dropdown">
              <div className="dropdown-item" onClick={ViewProfile}>
                <i className="fas fa-user"></i>
                <span>Profile</span>
              </div>
              
              <div className="dropdown-divider"></div>
              <div className="dropdown-item" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt"></i>
                <span>Logout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderStudent;
