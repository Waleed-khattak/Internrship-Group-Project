import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./SidebarStudent.css";

const SidebarStudent = () => {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 1024);
      setIsExpanded(width > 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // ✅ Use the same "auth" key as in StudentApp
    const auth = localStorage.getItem("auth");
    if (auth) {
      const parsed = JSON.parse(auth);
      if (parsed.user) {
        setUser({
          ...parsed.user,
          role: parsed.user.role || "Student", 
        });
      }
    }
  }, []);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const menuItems = [
    {
      path: "/student/dashboard",
      icon: "fas fa-tachometer-alt",
      label: "Dashboard",
    },
    {
      path: "/student/timetable",
      icon: "fas fa-calendar-alt",
      label: "Timetable",
    },
    {
      path: "/student/attendance",
      icon: "fas fa-clipboard-check",
      label: "Attendance",
    },
    {
      path: "/student/assignments",
      icon: "fas fa-tasks",
      label: "Assignments",
    },
    { path: "/student/results", icon: "fas fa-chart-line", label: "Results" },
    { path: "/student/fees", icon: "fas fa-money-check-alt", label: "Fees" },
    {
      path: "/student/announcements",
      icon: "fas fa-bullhorn",
      label: "Announcements",
    },
    { path: "/student/profile", icon: "fas fa-user-circle", label: "Profile" },
  ];

  return (
    <>
      {isMobile && !isExpanded && (
        <button className="hamburger-btn" onClick={toggleSidebar}>
          <i className="fas fa-bars"></i>
        </button>
      )}

      <div
        className={`student-sidebar ${isExpanded ? "expanded" : "collapsed"}`}
      >
        <div className="sidebar-header">
          <div className="logo-container">
            <Link to="/student/dashboard">
              <img src="/SmartDesk-logo.png" alt="SmartDesk" className="logo" />
            </Link>
          </div>
          {isMobile && isExpanded && (
            <button className="close-btn" onClick={toggleSidebar}>
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>

        <div className="sidebar-menu">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`menu-item ${
                location.pathname.startsWith(item.path) ? "active" : ""
              }`}
              onClick={() => isMobile && setIsExpanded(false)}
            >
              <i className={item.icon}></i>
              {isExpanded && <span>{item.label}</span>}
            </Link>
          ))}
        </div>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">
              <img
                src={`https://ui-avatars.com/api/?name=${
                  user?.name || "Student"
                }&background=0E59F2&color=fff`}
                alt={user?.name || "Student"}
              />
            </div>
            {isExpanded && (
              <Link to="/student/editprofile" className="user-details">
                <p className="user-name">{user?.name || "Student User"}</p>
                <p className="user-role">{user?.role || "Student"}</p>
              </Link>
            )}
          </div>
        </div>
      </div>

      {isMobile && isExpanded && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}
    </>
  );
};

export default SidebarStudent;
