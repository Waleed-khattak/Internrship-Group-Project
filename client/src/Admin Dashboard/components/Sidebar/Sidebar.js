import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isOpen }) => {
  const location = useLocation();

  const menuItems = [
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
    { icon: 'fas fa-chart-bar', label: 'Analytics', path: '/admin/analytics' }
  ];

  return (
    <div className={`sidebar ${isOpen ? 'active' : ''}`}>
      <div className="sidebar-header">
        <Link to="/admin">
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