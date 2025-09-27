import React, { useState } from "react";
import axios from "axios";
import "./forgot-reset.css";

const ForgotPassword = ({ onPinSent }) => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Student");
  const [msg, setMsg] = useState("");

  const handleRequestPin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/forgot-password/request-pin", { email, role });
      setMsg(res.data.msg);
      // Inform parent to show ResetPassword form
      onPinSent({ email, role });
    } catch (err) {
      setMsg(err.response?.data?.msg || "Error occurred");
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleRequestPin} className="forgot-password-form">
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="Student">Student</option>
          <option value="Teacher">Teacher</option>
          <option value="Admin">Admin</option>
        </select>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send PIN</button>
      </form>
      {msg && <p className="info-msg">{msg}</p>}
    </div>
  );
};

export default ForgotPassword;
