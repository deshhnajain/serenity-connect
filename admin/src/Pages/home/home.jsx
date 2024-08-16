import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserList from '../../Components/user/UserList';
import TherapistList from '../../Components/Therapist/TherapistList';
import './home.css';

function AdminHome() {
  const userCount = 150;
  const therapistCount = 75;
  const appointmentCount = 20;
  const testimonialCount = 10;

  return (
    <div className="admin-home">
      <main className="admin-content">
        <Routes>
          <Route path="/" element={
            <div className="admin-dashboard">
              <h2>Welcome to Admin Dashboard</h2>
              <div className="count-cards">
                <div className="count-card">
                  <h3>Registered Users</h3>
                  <p className="count">{userCount}</p>
                </div>
                <div className="count-card">
                  <h3>Registered Therapists</h3>
                  <p className="count">{therapistCount}</p>
                </div>
                <div className="count-card">
                  <h3>Total Appointments</h3>
                  <p className="count">{appointmentCount}</p>
                </div>
                <div className="count-card">
                  <h3>Testimonials</h3>
                  <p className="count">{testimonialCount}</p>
                </div>
              </div>
            </div>
          } />
          <Route path="users" element={<UserList />} />
          <Route path="therapists" element={<TherapistList />} />
        </Routes>
      </main>
    </div>
  );
}

export default AdminHome;