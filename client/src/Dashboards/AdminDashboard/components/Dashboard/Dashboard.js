import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StatsCard from '../StatsCard/StatsCard';
import DataTable from '../DataTable/DataTable';
import QuickActions from '../QuickActions/QuickActions';
import ActivityFeed from '../ActivityFeed/ActivityFeed';
import AttendanceChart from '../AttendanceChart/AttendanceChart';
import './Dashboard.css';

const Dashboard = () => {
  // Dummy user data with email verification flag
  const [user] = useState({
    name: 'Admin User',
    email: 'admin@ilmimarkaz.com',
    isEmailVerified: true
  });

  return (
    <div className="dashboard-content">
      {/* Email Verification Alert */}
      {!user.isEmailVerified && (
        <div className="alert alert-warning">
          <i className="fas fa-exclamation-circle"></i>
          <span>
            Your email is not verified! We have sent you an email on {user.email}, kindly verify your email.
          </span>
        </div>
      )}

      {/* Stats Overview (dummy data) */}
      <div className="stats-grid">
        <StatsCard 
          icon="fas fa-user-graduate" 
          value="1,250" 
          label="Total Students" 
          iconBgColor="var(--color-6)" 
          iconColor="var(--primary-color-1)" 
        />
        <StatsCard 
          icon="fas fa-chalkboard-teacher" 
          value="45" 
          label="Total Teachers" 
          iconBgColor="rgba(24, 187, 155, 0.1)" 
          iconColor="#18BB9B" 
        />
        <StatsCard 
          icon="fas fa-school" 
          value="24" 
          label="Total Classes" 
          iconBgColor="rgba(239, 173, 78, 0.1)" 
          iconColor="#EFAD4E" 
        />
        <StatsCard 
          icon="fas fa-money-bill-wave" 
          value="92%" 
          label="Fee Collection Rate" 
          iconBgColor="rgba(233, 87, 87, 0.1)" 
          iconColor="#E95757" 
        />
      </div>

      {/* Main Content Area */}
      <div className="content-grid">
        {/* Recent Students */}
        <div className="content-card">
          <div className="card-header">
            <h3>Recent Students</h3>
            <Link to="/admin/students" className="view-all">View All</Link>
          </div>
          <div className="card-body">
            <DataTable />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="content-card">
          <div className="card-header">
            <h3>Quick Actions</h3>
          </div>
          <div className="card-body">
            <QuickActions />
          </div>
        </div>

        {/* Recent Activities */}
        <div className="content-card">
          <div className="card-header">
            <h3>Recent Activities</h3>
          </div>
          <div className="card-body">
            <ActivityFeed />
          </div>
        </div>

        {/* Attendance Overview */}
        <div className="content-card">
          <div className="card-header">
            <h3>Attendance Overview</h3>
          </div>
          <div className="card-body">
            <AttendanceChart />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;