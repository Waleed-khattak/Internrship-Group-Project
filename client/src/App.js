import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import LoginPage from "./Login/LoginPage";
import SignUp from "./SignUp/SignUp";
import AdminApp from "./Admin Dashboard/AdminApp";
import StudentApp from "./Student Dashboard/StudentApp";
import TeacherApp from "./Teacher Dashboard/TeacherApp";
import Header from "./Header/Header";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const location = useLocation();

  const showHeader = location.pathname === "/";

  return (
    <>
      {showHeader && <Header />}
      <Routes>
        {/* Landing page just shows header */}
        <Route path="/" element={<div />} />

        {/* Auth pages */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Dashboards with role-based protection */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute role="Admin">
              <AdminApp />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/*"
          element={
            <ProtectedRoute role="Student">
              <StudentApp />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/*"
          element={
            <ProtectedRoute role="Teacher">
              <TeacherApp />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
