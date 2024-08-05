import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import MyNavbar from '../navbar/navbar';
import VerticalSidebar from '../navbar/Verticalnavbar';
import TherapistsList from '../../pages/therapistlist/therapistlist';
import PaidConsult from '../../pages/paidconselling/Paidconselling';
import TherapistLogin from '../../pages/TherapistAuth/therapistAuth';
import TherapistDashboard from '../../pages/TherapistHome/TherapistDashboard';
import TherapistDetails from '../../pages/therapistdetails/therapistDetails';
import AppointmentsList from '../TherapistrHome/ApointementsList';
import AboutUs from '../../pages/Aboutus/Aboutus';
import Footer from '../footer/footer';
import './Navigation.css';
function MainLayout() {
  const location = useLocation();
  const isDashboardPath = location.pathname.startsWith('/therapist-dashboard') || location.pathname.startsWith('/appointments');
  const isLoginPage = location.pathname === '/therapist-login';

  return (
    <>
      {isLoginPage ? (
        <Routes>
          <Route path="/therapist-login" element={<TherapistLogin />} />
        </Routes>
      ) : isDashboardPath ? (
        <div className="dashboard-layout">
          <VerticalSidebar />
          <div className="main-content">
            <Routes>
              <Route path="/therapist-dashboard" element={<TherapistDashboard />} />
              <Route path="/appointments" element={<AppointmentsList />} />
            </Routes>
          </div>
        </div>
      ) : (
        <>
          <MyNavbar />
          <Routes>
            <Route path="/services/therapy" element={<TherapistsList />} />
            <Route path="/services/paidcounseling" element={<PaidConsult />} />
            <Route path="/therapists/:id" element={<TherapistDetails />} />
            <Route path="/about" element={<AboutUs/>} />
          </Routes>
          <Footer />
        </>
      )}
    </>
  );
}

export default MainLayout;