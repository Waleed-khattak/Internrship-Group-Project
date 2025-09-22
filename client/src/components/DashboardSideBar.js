import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './DashboardSideBar.css';

const Sidebar = ({ isOpen, role }) => {
  const location = useLocation();

  // Menu items for different roles
  const menuConfig = {
    Admin: [
      { icon: 'fas fa-home', label: 'Dashboard', path: '/admin' },
      { icon: 'fas fa-user-graduate', label: 'Students', path: '/admin/students' },
      { icon: 'fas fa-chalkboard-teacher', label: 'Teachers', path: '/admin/teachers' },
      { icon: 'fas fa-school', label: 'Classes', path: '/admin/classes' },
      { icon: 'fas fa-book', label: 'Subjects', path: '/admin/subjects' },
      { icon: 'fas fa-calendar-alt', label: 'Timetable', path: '/admin/timetable' },
      { icon: 'fas fa-clipboard-check', label: 'Attendance', path: '/admin/attendance' },
      { icon: 'fas fa-file-alt', label: 'Exams', path: '/admin/exams' },
      { icon: 'fas fa-money-bill-wave', label: 'Fees', path: '/admin/fees' },
      { icon: 'fas fa-bullhorn', label: 'Announcements', path: '/admin/announcements' },
      { icon: 'fas fa-chart-bar', label: 'Analytics', path: '/admin/analytics' },
    ],

    Teacher: [
      { icon: 'fas fa-home', label: 'Dashboard', path: '/teacher' },
      { icon: 'fas fa-chalkboard-teacher', label: 'Classes', path: '/teacher/classes' },
      { icon: 'fas fa-calendar-alt', label: 'Class Timetable', path: '/teacher/timetable' },
      { icon: 'fas fa-clipboard-check', label: 'Mark Attendance', path: '/teacher/attendance' },
      { icon: 'fas fa-file-alt', label: 'Assignments', path: '/teacher/assignments' },
      { icon: 'fas fa-file-signature', label: 'Exams & Results', path: '/teacher/exams' },
      { icon: 'fas fa-bullhorn', label: 'Announcements', path: '/teacher/announcements' },
    ],

    Student: [
      { icon: 'fas fa-home', label: 'Dashboard', path: '/student' },
      { icon: 'fas fa-calendar-alt', label: 'Class Timetable', path: '/student/timetable' },
      { icon: 'fas fa-clipboard-check', label: 'Attendance', path: '/student/attendance' },
      { icon: 'fas fa-file-alt', label: 'Assignments', path: '/student/assignments' },
      { icon: 'fas fa-poll-h', label: 'Exam Results', path: '/student/results' },
      { icon: 'fas fa-money-bill-wave', label: 'Fees', path: '/student/fees' },
      { icon: 'fas fa-bullhorn', label: 'Announcements', path: '/student/announcements' },
    ],
  };

  const menuItems = menuConfig[role] || [];

  return (
    <div className={`sidebar ${isOpen ? 'active' : ''}`}>
      <div className="sidebar-header">
        <Link to={`/${role}`}>
          <img src="/ilmi-logo.png" alt="Ilmi Markaz Logo" className="sidebar-logo" />
        </Link>
      </div>
      <ul className="sidebar-menu">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={`menu-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <Link to={item.path}>
              <i className={item.icon}></i>
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
