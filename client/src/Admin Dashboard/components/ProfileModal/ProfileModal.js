import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileModal.css';

const ProfileModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const userData = {
    name: 'Admin User',
    email: 'admin@ilmimarkaz.com',
    role: 'School Administrator',
    phone: '+92 300 1234567',
    joinDate: 'January 15, 2023'
  };

  const handleEditProfile = () => {
    onClose();
    navigate('/admin/EditProfile');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>User Profile</h3>
          <button className="close-btn" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="modal-body">
          <div className="profile-header">
            <img src="https://ui-avatars.com/api/?name=Admin+User&background=0E59F2&color=fff&size=80" alt="Admin User" />
            <h4>{userData.name}</h4>
            <p>{userData.role}</p>
          </div>
          <div className="profile-details">
            <div className="detail-item">
              <label>Email:</label>
              <span>{userData.email}</span>
            </div>
            <div className="detail-item">
              <label>Phone:</label>
              <span>{userData.phone}</span>
            </div>
            <div className="detail-item">
              <label>Member Since:</label>
              <span>{userData.joinDate}</span>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Close
          </button>
          <button className="modal-btn-primary" onClick={handleEditProfile}>
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;