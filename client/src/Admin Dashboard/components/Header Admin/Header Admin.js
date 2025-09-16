import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileModal from '../ProfileModal/ProfileModal';
import './Header Admin.css';
import { logoutUser } from "../../../utils/auth";

const Header = ({ onToggleSidebar }) => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [contactType, setContactType] = useState(null);
  const dropdownRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (contactRef.current && !contactRef.current.contains(event.target)) {
        setContactType(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    logoutUser();
    localStorage.removeItem('token');
    navigate('/login');
    setDropdownOpen(false);
  };

  const handleProfile = () => {
    setProfileModalOpen(true);
    setDropdownOpen(false);
  };

  const handleSettings = () => {
    navigate('/admin/settings');
    setDropdownOpen(false);
  };

  const closeProfileModal = () => setProfileModalOpen(false);

  const handleContactClick = (type) => {
    setContactType(contactType === type ? null : type);
  };

  return (
    <>
      <header className="header">
        <div className="header-left">
          <button className="sidebar-toggle" onClick={onToggleSidebar}>
            <i className="fas fa-bars"></i>
          </button>
          <h3>Admin Dashboard</h3>
        </div>
        <div className="header-right">
          <div className="notification">
            <i className="fas fa-bell"></i>
            <span className="badge">3</span>
          </div>
          <div className="contact-info" ref={contactRef}>
            <button className="contact-btn" onClick={() => handleContactClick('phone')}>
              <i className="fas fa-phone-alt"></i>
            </button>
            <button className="contact-btn" onClick={() => handleContactClick('email')}>
              <i className="fas fa-envelope"></i>
            </button>
            {contactType === 'phone' && (
              <div className="contact-dropdown">
                <div className="contact-item">
                  <i className="fas fa-phone-alt"></i>
                  <a href="tel:+923001234567" className="contact-link">+92 300 1234567</a>
                </div>
              </div>
            )}
            {contactType === 'email' && (
              <div className="contact-dropdown">
                <div className="contact-item">
                  <i className="fas fa-envelope"></i>
                  <a href="mailto:admin@ilmimarkaz.com" className="contact-link">admin@ilmimarkaz.com</a>
                </div>
              </div>
            )}
          </div>
          <div className="user-profile" ref={dropdownRef}>
  <button 
    className="user-info" 
    onClick={toggleDropdown}
    type="button"
  >
    <img 
      src="https://ui-avatars.com/api/?name=Admin+User&background=0E59F2&color=fff" 
      alt="Admin User" 
    />
    <span>Admin User</span>
    <i className={`fas fa-chevron-down ${dropdownOpen ? 'rotate' : ''}`}></i>
  </button>
  {dropdownOpen && (
    <div className="dropdown-menu show"> {/* Added show class */}
      <button 
        type="button"
        className="dropdown-item" 
        onClick={handleProfile}
      >
        <i className="fas fa-user"></i>
        <span>My Profile</span>
      </button>
      <button 
        type="button"
        className="dropdown-item"
        onClick={handleSettings}
      >
        <i className="fas fa-cog"></i>
        <span>Settings</span>
      </button>
      <div className="dropdown-divider"></div>
      <button 
        type="button"
        className="dropdown-item" 
        onClick={handleLogout}
      >
        <i className="fas fa-sign-out-alt"></i>
        <span>Logout</span>
      </button>
    </div>
  )}
</div>
        </div>
      </header>
      <ProfileModal isOpen={profileModalOpen} onClose={closeProfileModal} />
    </>
  );
};

export default Header;