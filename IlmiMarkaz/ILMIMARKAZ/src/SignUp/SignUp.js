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
  const navigate = useNavigate();
  const goToLoginPage = () => {
    navigate("/login");
  };
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

  const handleSubmit = () => {
  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }
  if (captcha.toUpperCase() !== generatedCaptcha) {
    alert("Captcha Invalid");
    return;
  }

  const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
  const userExists = existingUsers.some(
    (user) => user.username === username || user.email === email
  );
  if (userExists) {
    alert("User already exists");
    return;
  }

  const newUser = { name, username, email, password };
  existingUsers.push(newUser);
  localStorage.setItem("users", JSON.stringify(existingUsers));

  alert("Registration Successful");

  navigate("/login"); // ✅ go to login page
};


  return (
    <div className="loginMainDiv">
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
          <img src="/ilmi-logo.png" alt="Logo" />
        </div>

        <div className="welcomePart">
          <p className="welcomeHeading">Welcome to Ilmi Markaz!👋</p>
          <p className="welcomeBelowLine">
            Please register to your account and start the adventure
          </p>
        </div>
        <div className="name">
          <div className="heading">NAME</div>
          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="username">
          <div className="heading">USERNAME</div>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="email">
          <div className="heading">EMAIL</div>
          <input
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="password">
          <div className="heading">PASSWORD</div>
          <input
            type="password"
            placeholder="........"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="confirmPassword">
          <div className="heading">CONFIRM PASSWORD</div>
          <input
            type="password"
            placeholder="........"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {/* Captcha Section */}
        <div className="captcha">
          <div className="heading">Captcha</div>

          <div className="captchaRow">
            <div className="captchaBox">
              <svg
                className="captchaSvg"
                width="160"
                height="56"
                viewBox="0 0 160 56"
                xmlns="http://www.w3.org/2000/svg"
              >
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

                <text
                  x="12"
                  y="36"
                  className="captchaText"
                  fontFamily="monospace"
                >
                  {generatedCaptcha}
                </text>

                <path
                  className="decorPath"
                  d="M5 45 C40 10, 120 10, 155 45"
                  fill="transparent"
                />
              </svg>
            </div>

            <button
              type="button"
              className="btn refreshBtn btn-success"
              onClick={refreshCaptcha}
              aria-label="Refresh captcha"
            >
              ⟳
            </button>
          </div>

          <input
            type="text"
            className="captchaInput"
            placeholder="Enter Captcha"
            value={captcha}
            onChange={(e) => setCaptcha(e.target.value)}
            maxLength={6}
          />
        </div>

        {/* Buttons */}
      <div className="button">
  <button
    className="btn btn-primary signUpBtn"
    onClick={handleSubmit}
  >
    Register
  </button>
</div>

        <div className="donthaveAccount">
          Already have an account?
          <span onClick={goToLoginPage}> Login Here</span>
        </div>
      </div>
    </div>
  );
}