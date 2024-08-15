// src/Components/AdminNavbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './adminNavbar.css';

function AdminNavbar() {
  return (
    <nav className="admin-nav">
      <h1>Admin Panel</h1>
      <ul>
        <li><Link to="/ home">Home</Link></li>
        <li><Link to="/userlist">User List</Link></li>
        <li><Link to="/therapistList">Therapist List</Link></li>
      </ul>
    </nav>
  );
}

export default AdminNavbar;
