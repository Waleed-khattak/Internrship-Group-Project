import React, { useState } from "react";
import axios from "axios";
import "./forgot-reset.css";

const ResetPassword = ({ email, role }) => {
  const [pin, setPin] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/forgot-password/reset-with-pin", {
        email,
        role,
        pin,
        newPassword,
      });
      setMsg(res.data.msg);
    } catch (err) {
      setMsg(err.response?.data?.msg || "Error occurred");
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Reset Password</h2>
      <p>Check your email for the 4-digit PIN.</p>
      <form onSubmit={handleReset} className="forgot-password-form">
        <input
          type="text"
          placeholder="Enter PIN"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      {msg && <p className="info-msg">{msg}</p>}
    </div>
  );
};

export default ResetPassword;
