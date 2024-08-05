import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faSignOutAlt, faBars } from '@fortawesome/free-solid-svg-icons';
import styles from './VerticalSidebar.module.css';

const VerticalSidebar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const loggedInStatus = !!localStorage.getItem('therapistId');
    setIsLoggedIn(loggedInStatus);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('therapistId');
    setIsLoggedIn(false);
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`${styles.sidebarWrapper} ${isCollapsed ? styles.collapsed : ''}`}>
      <button className={styles.toggleButton} onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <div className={`${styles.sidebar} ${isCollapsed ? styles.collapsedSidebar : ''}`}>
        <NavLink to="/therapist-dashboard" className={styles.navLink}>
          <FontAwesomeIcon icon={faHome} /> <span className={styles.linkText}>Home</span>
        </NavLink>
        <NavLink to="/appointments" className={styles.navLink}>
          <FontAwesomeIcon icon={faUser} /> <span className={styles.linkText}>Appointments</span>
        </NavLink>
       
        {isLoggedIn ? (
          
          <button className={styles.navLink} onClick={handleLogout}>
            <NavLink to="/therapist-login" className={styles.navLink}>
            <FontAwesomeIcon icon={faSignOutAlt} /> <span className={styles.linkText}>Logout</span></NavLink>
          </button>
        ) : (
          <>
            <NavLink to="/therapist-login" className={styles.navLink}>
              <FontAwesomeIcon icon={faUser} /> <span className={styles.linkText}>Login as a therapist</span>
            </NavLink>
            <NavLink to="/therapist-signup" className={styles.navLink}>
              <FontAwesomeIcon icon={faUser} /> <span className={styles.linkText}>Sign Up as a therapist</span>
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default VerticalSidebar;
