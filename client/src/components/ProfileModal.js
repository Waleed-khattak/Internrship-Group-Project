import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileModal.css';

const ProfileModal = ({ isOpen = true, onClose, user }) => {
  const navigate = useNavigate();

  // If no user found → show message
  if (!user) {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <p>No user data available.</p>
          <button onClick={() => navigate("/login")}>Go to Login</button>
        </div>
      </div>
    );
  }

  // If isOpen=false (popup usage) → don’t render
  if (!isOpen) return null;

  const { name, email, role, phone, joinDate } = user;

  const handleEditProfile = () => {
    if (onClose) onClose(); // close if modal usage

    // Navigate to correct edit profile page based on role
    switch (role?.toLowerCase()) {
      case "admin":
        navigate("/admin/editprofile");
        break;
      case "teacher":
        navigate("/teacher/editprofile");
        break;
      case "student":
        navigate("/student/editprofile");
        break;
      default:
        console.warn("Unknown role:", role);
        navigate("/login"); // fallback
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <h3>User Profile</h3>
          {onClose && (
            <button className="close-btn" onClick={onClose}>
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>

        {/* Body */}
        <div className="modal-body">
          <div className="profile-header">
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                name
              )}&background=0E59F2&color=fff&size=80`}
              alt={name}
            />
            <h4>{name}</h4>
            <p>{role}</p>
          </div>

          <div className="profile-details">
            <div className="detail-item">
              <label>Email:</label>
              <span>{email}</span>
            </div>
            <div className="detail-item">
              <label>Phone:</label>
              <span>{phone || "N/A"}</span>
            </div>
            <div className="detail-item">
              <label>Member Since:</label>
              <span>{joinDate || "N/A"}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          {onClose && (
            <button className="btn-secondary" onClick={onClose}>
              Close
            </button>
          )}
          <button className="modal-btn-primary" onClick={handleEditProfile}>
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
