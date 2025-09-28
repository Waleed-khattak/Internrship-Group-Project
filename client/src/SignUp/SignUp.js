import React, { useState } from "react";
import "../Login/LoginPage.css";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [generatedCaptcha, setGeneratedCaptcha] = useState(generateCaptcha());
  const [role, setRole] = useState("Student");
  const [modalMessage, setModalMessage] = useState(""); // modal state
  const navigate = useNavigate();

  function generateCaptcha() {
    const chars = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
    let result = "";
    for (let i = 0; i < 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  const refreshCaptcha = () => {
    setGeneratedCaptcha(generateCaptcha());
    setCaptcha("");
  };

  const closeModal = () => setModalMessage("");

  const goToLoginPage = () => {
    navigate("/login");
  };

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setModalMessage("Passwords do not match");
      return;
    }
    if (captcha.toUpperCase() !== generatedCaptcha) {
      setModalMessage("Captcha Invalid");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, username, email, password, role }),
      });

      const data = await response.json();
      if (response.ok) {
        setModalMessage("Registration Successful");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setModalMessage(data.msg || "Registration failed");
      }
    } catch (error) {
      setModalMessage("Server error, please try again later.");
    }
  };

  return (
    <div className="loginMainDiv">
      {/* Modal */}
      {modalMessage && (
        <div className="modalOverlay">
          <div className="modalContent">
            <p>{modalMessage}</p>
            <button className="modalBtn" onClick={closeModal}>OK</button>
          </div>
        </div>
      )}

      <div className="verifiedSchool">
        <div className="verifiedSchoolsHeading">
          Our Verified Schools around Pakistan
        </div>
        <div className="getPremium">
          Register your school today and get Free premium class features for
          your school
        </div>
        <div className="mapdiv">
          <iframe
            title="Lahore Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54425.10878999191!2d74.27313175000001!3d31.5203694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190483f1f8c36b%3A0x43e40305ec59cf2d!2sLahore%2C%20Pakistan!5e0!3m2!1sen!2s!4v1694500000000!5m2!1sen!2s"
            width="100%"
            height="100%"
            style={{ border: "0" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      <div className="loginSide">
        <div className="imageDiv">
          <img src="/SmartDesk-logo.png" alt="Logo" style={{objectFit: 'cover'}}/>
        </div>

        <div className="welcomePart">
          <p className="welcomeHeading">Welcome to SmartDesk!👋</p>
          <p className="welcomeBelowLine">
            Please register to your account and start the adventure
          </p>
        </div>

        <div className="name">
          <div className="heading">NAME</div>
          <input type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="username">
          <div className="heading">USERNAME</div>
          <input type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="email">
          <div className="heading">EMAIL</div>
          <input type="text" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="role">
          <div className="heading">ROLE</div>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="Teacher">Teacher</option>
            <option value="Student">Student</option>
          </select>
        </div>
        <div className="password">
          <div className="heading">PASSWORD</div>
          <input type="password" placeholder="........" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="confirmPassword">
          <div className="heading">CONFIRM PASSWORD</div>
          <input type="password" placeholder="........" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>

        {/* Captcha Section */}
        <div className="captcha">
          <div className="heading">Captcha</div>
          <div className="captchaRow">
            <div className="captchaBox">
              <svg className="captchaSvg" width="160" height="56" viewBox="0 0 160 56" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="g1" x1="0" x2="1">
                    <stop offset="0%" stopColor="#f7f7f9" />
                    <stop offset="100%" stopColor="#e9eef8" />
                  </linearGradient>
                </defs>
                <rect width="160" height="56" fill="url(#g1)" rx="8" />
                <g className="noiseLines">
                  <line x1="0" y1="10" x2="160" y2="20" />
                  <line x1="0" y1="30" x2="160" y2="40" />
                  <line x1="10" y1="0" x2="20" y2="56" />
                </g>
                <text x="12" y="36" className="captchaText" fontFamily="monospace">{generatedCaptcha}</text>
                <path className="decorPath" d="M5 45 C40 10, 120 10, 155 45" fill="transparent" />
              </svg>
            </div>
            <button type="button" className="btn refreshBtn btn-success" onClick={refreshCaptcha} aria-label="Refresh captcha">⟳</button>
          </div>
          <input type="text" className="captchaInput" placeholder="Enter Captcha" value={captcha} onChange={(e) => setCaptcha(e.target.value)} maxLength={6} />
        </div>

        {/* Buttons */}
        <div className="buttons">
          <button className="btn signUpBtn btn-primary my-3" onClick={handleSubmit}>Register</button>
        </div>

        <div className="donthaveAccount">
          Already have an account?<span onClick={goToLoginPage}> Login Here</span>
        </div>
      </div>

      {/* Modal CSS */}
      <style>{`
        .modalOverlay {
          position: fixed;
          top:0;
          left:0;
          width:100%;
          height:100%;
          background: rgba(0,0,0,0.5);
          display:flex;
          justify-content:center;
          align-items:center;
          z-index: 9999;
        }
        .modalContent {
          background:#fff;
          padding:20px 30px;
          border-radius:8px;
          text-align:center;
          max-width:300px;
          box-shadow:0 2px 10px rgba(0,0,0,0.3);
          animation: fadeIn 0.3s ease;
        }
        .modalBtn {
          margin-top: 15px;
          padding: 8px 20px;
          font-size: 16px;
          font-weight: bold;
          background: #00c49a;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor:pointer;
          display:block;
          margin-left:auto;
          margin-right:auto;
        }
        @keyframes fadeIn {
          0% {opacity:0; transform: scale(0.9);}
          100% {opacity:1; transform: scale(1);}
        }
      `}</style>
    </div>
  );
}
