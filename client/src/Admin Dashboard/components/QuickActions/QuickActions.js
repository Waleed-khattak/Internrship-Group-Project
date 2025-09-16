import React from 'react';
import { useNavigate } from 'react-router-dom';
import './QuickActions.css';

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    { icon: 'fas fa-plus-circle', label: 'Add Student', path: '/admin/students' },
    { icon: 'fas fa-plus-circle', label: 'Add Teacher', path: '/admin/teachers' },
    { icon: 'fas fa-book', label: 'Create Class', path: '/admin/classes' },
    { icon: 'fas fa-calendar-alt', label: 'Mark Attendance', path: '/admin/attendance' },
    { icon: 'fas fa-file-invoice', label: 'Generate Report', path: '/admin/exams' },
    { icon: 'fas fa-bullhorn', label: 'Post Announcement', path: '/admin/announcements' }
  ];

  const handleAction = (path) => {
    navigate(path);
  };

  return (
    <div className="quick-actions">
      {actions.map((action, index) => (
        <button
          key={index}
          className="quick-action-btn"
          onClick={() => handleAction(action.path)}
        >
          <i className={action.icon}></i>
          <span>{action.label}</span>
        </button>
      ))}
    </div>
  );
};

export default QuickActions;