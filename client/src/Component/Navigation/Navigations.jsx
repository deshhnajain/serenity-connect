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
import Login from '../../pages/Userauth/Login';
import Signup from '../../pages/Userauth/Signup';
import Home from '../../pages/Home/Home';
import './Navigation.css';
import GetHelp from '../../pages/gethelp/GetHelp';
function MainLayout() {
  const location = useLocation();
  const isDashboardPath = location.pathname.startsWith('/therapist-dashboard') || location.pathname.startsWith('/appointments');
  const isLoginPage = location.pathname === '/therapist-login'|| location.pathname === '/user-login' || location.pathname === '/user-signup';

  return (
    <>
      {isLoginPage ? (
        <Routes>
          <Route path="/therapist-login" element={<TherapistLogin />} />
          <Route path="/user-login" element={<Login />} />
          <Route path="/user-signup" element={<Signup />} />
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
            <Route path="/" element={<Home />} />
            <Route paht='/home' element={<Home />} />
            <Route path ='/gethelp' element={<GetHelp/>}/>
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
