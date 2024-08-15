// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Pages/login/Login';
import Home from '../../admin/src/Pages/home/home';
import UserList from './Components/UserList';
import TherapistList from './Components/TherapistList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/therapistList" element={<TherapistList />} />
        <Route path="/userlist" element={<UserList />} />
      </Routes>
    </Router>
  );
}

export default App;
