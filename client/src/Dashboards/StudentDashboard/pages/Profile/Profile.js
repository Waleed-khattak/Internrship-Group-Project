import React, { useState, useEffect } from "react";
import "./Profile.css";

const Profile = () => {
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    if (auth?.user) {
      setStudentData(auth.user); // Get data directly from auth.user
    }
  }, []);

  if (!studentData) {
    return (
      <div className="profile-page">
        <h1 className="page-title">Student Profile</h1>
        <p>No user data available. Go to Login.</p>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <h1 className="page-title">Student Profile</h1>

      <div className="profile-header">
        <div className="profile-avatar">
          <img
            src={`https://ui-avatars.com/api/?name=${studentData.name}&background=0E59F2&color=fff&size=120`}
            alt={studentData.name}
          />
          <div className="online-status"></div>
        </div>

        <div className="profile-info">
          <h2>{studentData.name}</h2>
          <p>
            {studentData.class} - Roll Number: {studentData.rollNumber}
          </p>
          <p>Student ID: {studentData.studentId}</p>
        </div>
      </div>

      <div className="profile-content">
        {/* Personal Information */}
        <div className="profile-section">
          <h3>Personal Information</h3>
          <div className="profile-details">
            <div className="detail-row">
              <div className="detail-item">
                <label>Full Name</label>
                <span>{studentData.name}</span>
              </div>
              <div className="detail-item">
                <label>Date of Birth</label>
                <span>{studentData.dateOfBirth}</span>
              </div>
            </div>
            <div className="detail-row">
              <div className="detail-item">
                <label>Gender</label>
                <span>{studentData.gender}</span>
              </div>
              <div className="detail-item">
                <label>Blood Group</label>
                <span>{studentData.bloodGroup}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Academic Information */}
        <div className="profile-section">
          <h3>Academic Information</h3>
          <div className="profile-details">
            <div className="detail-row">
              <div className="detail-item">
                <label>Class</label>
                <span>{studentData.class}</span>
              </div>
              <div className="detail-item">
                <label>Section</label>
                <span>{studentData.section}</span>
              </div>
            </div>
            <div className="detail-row">
              <div className="detail-item">
                <label>Roll Number</label>
                <span>{studentData.rollNumber}</span>
              </div>
              <div className="detail-item">
                <label>Student ID</label>
                <span>{studentData.studentId}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="profile-section">
          <h3>Contact Information</h3>
          <div className="profile-details">
            <div className="detail-row">
              <div className="detail-item">
                <label>Email Address</label>
                <span>{studentData.email}</span>
              </div>
              <div className="detail-item">
                <label>Phone Number</label>
                <span>{studentData.phone}</span>
              </div>
            </div>
            <div className="detail-row">
              <div className="detail-item full-width">
                <label>Address</label>
                <span>{studentData.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Parent Information */}
        <div className="profile-section">
          <h3>Parent Information</h3>
          <div className="profile-details">
            <div className="detail-row">
              <div className="detail-item">
                <label>Father's Name</label>
                <span>{studentData.fatherName}</span>
              </div>
              <div className="detail-item">
                <label>Father's Phone</label>
                <span>{studentData.fatherPhone}</span>
              </div>
            </div>
            <div className="detail-row">
              <div className="detail-item">
                <label>Mother's Name</label>
                <span>{studentData.motherName}</span>
              </div>
              <div className="detail-item">
                <label>Mother's Phone</label>
                <span>{studentData.motherPhone}</span>
              </div>
            </div>
            <div className="detail-row">
              <div className="detail-item">
                <label>Emergency Contact</label>
                <span>{studentData.emergencyContact}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
