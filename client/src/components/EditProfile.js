import React, { useState } from "react";
import "./EditProfile.css";

const EditProfile = () => {
  const auth = JSON.parse(localStorage.getItem("auth") || "{}");
  const user = auth?.user || {};

  const [form, setForm] = useState({
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
    role: user.role || "",
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);

    const updatedUser = { ...user, ...form };
    localStorage.setItem(
      "auth",
      JSON.stringify({
        ...(auth || {}),
        user: updatedUser,
      })
    );

    console.log("Updated profile data:", updatedUser);
  };

  return (
    <div className="edit-profile-page">
      <div className="edit-profile-card">
        <h2>Edit {form.role} Profile</h2>

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

          {success && (
            <div className="success-msg">
              {form.role} profile updated successfully!
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
