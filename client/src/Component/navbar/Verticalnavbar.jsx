import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCalendarAlt, faSignInAlt, faUserPlus, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import styles from './VerticalSidebar.module.css';

const VerticalSidebar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkLoginStatus = () => {
      const therapistId = localStorage.getItem('therapistId');
      setIsLoggedIn(!!therapistId);
    };

    checkLoginStatus();
    window.addEventListener('storage', checkLoginStatus);

    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('therapistId');
    setIsLoggedIn(false);
    navigate('/home');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className={styles.sidebarWrapper}>
      <nav className={styles.sidebar}>
        <NavLink to="/therapist-dashboard" className={`${styles.navLink} ${isActive('/therapist-dashboard') ? styles.active : ''}`}>
          <FontAwesomeIcon icon={faHome} />
          <span className={styles.linkText}>Home</span>
        </NavLink>
        
        {isLoggedIn && (
          <NavLink to="/appointments" className={`${styles.navLink} ${isActive('/appointments') ? styles.active : ''}`}>
            <FontAwesomeIcon icon={faCalendarAlt} />
            <span className={styles.linkText}>Appointments</span>
          </NavLink>
        )}
        
        {!isLoggedIn ? (
          <>
            <NavLink to="/therapist-login" className={`${styles.navLink} ${isActive('/therapist-login') ? styles.active : ''}`}>
              <FontAwesomeIcon icon={faSignInAlt} />
              <span className={styles.linkText}>Login</span>
            </NavLink>
            <NavLink to="/therapist-signup" className={`${styles.navLink} ${isActive('/therapist-signup') ? styles.active : ''}`}>
              <FontAwesomeIcon icon={faUserPlus} />
              <span className={styles.linkText}>Sign Up</span>
            </NavLink>
          </>
        ) : (
          <button className={`${styles.navLink} ${styles.logoutButton}`} onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} />
            <span className={styles.linkText}>Logout</span>
          </button>
        )}
      </nav>
    </div>
  );
};

export default VerticalSidebar;