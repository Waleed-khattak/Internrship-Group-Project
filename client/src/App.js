import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./Login/LoginPage";
import SignUp from "./SignUp/SignUp";
import AdminApp from "./Dashboards/AdminDashboard/AdminApp";
import StudentApp from "./Dashboards/StudentDashboard/StudentApp";
import TeacherApp from "./Dashboards/TeacherDashboard/TeacherApp";
import Header from "./Header/Header";
import ProtectedRoute from "./Components/ProtectedRoute";
import Index from './Components/Index';
import ForgotPasswordFlow from "./pages/ForgotPasswordFlow";

function App() {
  return (
    <>
      <Routes>
        {/* Landing page: show Header + Index */}
        <Route
          path="/"
          element={
            <>
              <Header />
              <Index />
            </>
          }
        />

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
        
        <Route path="/forgot-password" element={<ForgotPasswordFlow />} />
      </Routes>
    </>
  );
}

export default App;
