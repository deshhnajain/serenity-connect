import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './Pages/login/Login';
import Home from '../../admin/src/Pages/home/home';
import UserList from './Components/user/UserList';
import TherapistList from './Components/Therapist/TherapistList';
import AdminNavbar from './Components/Navbar/adminNavbar';

function App() {
  return (
    <Router>
      <Content />
    </Router>
  );
}

function Content() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <>
      {!isLoginPage && <AdminNavbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/therapistList" element={<TherapistList />} />
        <Route path="/userlist" element={<UserList />} />
      </Routes>
    </>
  );
}

export default App;
