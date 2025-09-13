import React, { useState } from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";



export default function Header() {
  const navigate = useNavigate();
  const [showSideBar, setShowSideBar] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  // Dropdown states
  const [showFeaturesDropdown, setShowFeaturesDropdown] = useState(false);
  const [showFreeServicesDropdown, setShowFreeServicesDropdown] =
    useState(false);
  // Submenus in dropdown
  const [showFinanceMenu, setShowFinanceMenu] = useState(false);
  const [showAttendanceMenu, setShowAttendanceMenu] = useState(false);
  const [showStudentMenu, setShowStudentMenu] = useState(false);
  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const [showIntegrationMenu, setShowIntegrationMenu] = useState(false);

  const clickRegBtn = () => navigate("/signup");
  const clickLines = () => setShowSideBar(true);
  const clickCancelBtn = () => {
    setShowSideBar(false);
    setShowSearchBar(false);
  };
  const clickSearchBtn = () => setShowSearchBar(true);

  const toggleFeaturesDropdown = (e) => {
    e.stopPropagation();
    setShowFeaturesDropdown(!showFeaturesDropdown);
    setShowFreeServicesDropdown(false);
  };

  const toggleFreeServicesDropdown = (e) => {
    e.stopPropagation();
    setShowFreeServicesDropdown(!showFreeServicesDropdown);
    setShowFeaturesDropdown(false);
  };

  const closeDropdowns = () => {
    setShowFeaturesDropdown(false);
    setShowFreeServicesDropdown(false);
  };

  return (
    <div onClick={closeDropdowns}>
      <div className="bluebar">
        <div className="contactinfo">
          <div className="num">
            <span>📞</span> +92(336)3473602
          </div>
          <div className="gmail">
            <span>✉</span> support@ilmimarkez.com
          </div>
        </div>
        <div className="location">
          <span>📍</span> Suther Coloney Mithi Tharpakar
        </div>
      </div>

      {/* Main header */}
      <div className="mainheader">
        <div className="firstpart">
          <img src="/ilmi-logo.png" alt="Logo" />
        </div>

        <div className="secondpart">
          <div className="headingsheader">Home</div>

          {/* Features dropdown */}
          <div
            className="headingsheader dropdown-container"
            onClick={toggleFeaturesDropdown}
          >
            Features
            <span
  className={`arrowdown ${showFeaturesDropdown ? "arrow-up" : ""}`}
>
  ▼
</span>

            <div
              className={`dropdown-menu features-dropdown ${
                showFeaturesDropdown ? "show" : ""
              }`}
            >
              <div className="dropdown-item">Multi Campus</div>
              <div className="dropdown-item">Admission Management System</div>
              <div className="dropdown-item">Classes & Sections</div>
              <div className="dropdown-item">Manage Subjects</div>
              <div className="dropdown-item">Teacher & Staff</div>
              <div className="dropdown-item">Manage Students</div>

              <div
                className="dropdown-item has-submenu"
                onMouseEnter={() => setShowFinanceMenu(true)}
                onMouseLeave={() => setShowFinanceMenu(false)}
              >
                Finance <span className="arrow-right">▶</span>
                {showFinanceMenu && (
                  <div className="submenu">
                    <div className="submenu-item">Bank Accounts</div>
                    <div className="submenu-item">Petty Cash</div>
                    <div className="submenu-item">Fee Structure</div>
                    <div className="submenu-item">Fee Voucher</div>
                  </div>
                )}
              </div>

              <div
                className="dropdown-item has-submenu"
                onMouseEnter={() => setShowAttendanceMenu(true)}
                onMouseLeave={() => setShowAttendanceMenu(false)}
              >
                Attendance <span className="arrow-right">▶</span>
                {showAttendanceMenu && (
                  <div className="submenu">
                    <div className="submenu-item">Students Attendance</div>
                    <div className="submenu-item">Manage Leaves</div>
                  </div>
                )}
              </div>

              <div className="dropdown-item">Timetable</div>
              <div className="dropdown-item">Broadcast</div>
              <div className="dropdown-item">Exam Management</div>
            </div>
          </div>

          {/* Free Services dropdown */}
          <div
            className="headingsheader dropdown-container"
            onClick={toggleFreeServicesDropdown}
          >
            Free Services
            <span
              className={`arrowdown ${
                showFreeServicesDropdown ? "arrow-up" : ""
              }`}
            >
              ▼
            </span>
            <div
              className={`dropdown-menu free-services-dropdown ${
                showFreeServicesDropdown ? "show" : ""
              }`}
            >
              <div
                className="dropdown-item has-submenu"
                onMouseEnter={() => setShowStudentMenu(true)}
                onMouseLeave={() => setShowStudentMenu(false)}
              >
                Students <span className="arrow-right">▶</span>
                {showStudentMenu && (
                  <div className="submenu">
                    <div className="submenu-item">Admission</div>
                    <div className="submenu-item">Attendance</div>
                    <div className="submenu-item">Time Table</div>
                    <div className="submenu-item">Batches & Sessions</div>
                  </div>
                )}
              </div>

              <div
                className="dropdown-item has-submenu"
                onMouseEnter={() => setShowAdminMenu(true)}
                onMouseLeave={() => setShowAdminMenu(false)}
              >
                Administrative <span className="arrow-right">▶</span>
                {showAdminMenu && (
                  <div className="submenu">
                    <div className="submenu-item">Administration</div>
                    <div className="submenu-item">Examination Management</div>
                    <div className="submenu-item">Campus Management</div>
                  </div>
                )}
              </div>

              <div
                className="dropdown-item has-submenu"
                onMouseEnter={() => setShowIntegrationMenu(true)}
                onMouseLeave={() => setShowIntegrationMenu(false)}
              >
                Integration <span className="arrow-right">▶</span>
                {showIntegrationMenu && (
                  <div className="submenu">
                    <div className="submenu-item">Email</div>
                    <div className="submenu-item">SMS</div>
                    <div className="submenu-item">WhatsApp</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="headingsheader">Blogs</div>
          <div className="headingsheader">Contact</div>
        </div>

        {/* Sidebar */}
        {showSideBar && (
          <div className="threelinesclickMainDiv">
            <div className="cancelBtn" onClick={clickCancelBtn}>
              <i className="fa-solid fa-xmark"></i>
            </div>
            <div className="mainContent">
              <div className="threeLinesmainheading"> Ilmi Markaz </div>
              <div className="threeLinesmainheadingbelowtext">
                Smart Solutions for Smarter Schools
              </div>
              <div className="contactPara">
                Automate Institute Daily Operations, Generate Insightful
                Reports, Make Better & Faster Decisions.
              </div>
            </div>
          </div>
        )}

        {showSearchBar && (
          <div className="fullScreen">
            <div className="cancelBtn" onClick={clickCancelBtn}>
              <i className="fa-solid fa-xmark"></i>
            </div>
          </div>
        )}

        <div className="thirdpart">
          <div className="searchSymbol" onClick={clickSearchBtn}>
            <img src="/search-interface-symbol.png" alt="Search" />
          </div>
          <div className="verticalsmallline"></div>
          <div className="threelines" onClick={clickLines}>
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
          </div>
        </div>

        <div className="fourthPart">
          <button className="regBtn" onClick={clickRegBtn}>
            Register Now →
          </button>
        </div>
      </div>
    </div>
  );
}