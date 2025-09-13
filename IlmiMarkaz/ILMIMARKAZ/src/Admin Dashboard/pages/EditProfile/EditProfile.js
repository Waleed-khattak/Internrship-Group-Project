import React, { useState } from 'react';
import './EditProfile.css';

const EditProfile = () => {
  const [form, setForm] = useState({
    name: 'Admin User',
    email: 'admin@ilmimarkaz.com',
    phone: '+92 300 1234567'
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    // Here you would typically send the updated data to your backend
  };

  return (
    <div className="edit-profile-page">
      <div className="edit-profile-card">
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>
          <button className="btn-primary" type="submit">
            Save Changes
          </button>
          {success && <div className="success-msg">Profile updated successfully!</div>}
        </form>
      </div>
    </div>
  );
};

export default EditProfile;