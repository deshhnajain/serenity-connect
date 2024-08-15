import React, { useState, useEffect } from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt, faCog, faCalendar, faUsers, faMoneyCheckAlt } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const MyNavbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInName, setLoggedInName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('token');
      const name = localStorage.getItem('loggedInUser');
      
      if (token) {
        setIsLoggedIn(true);
        setLoggedInName(name || 'User');
      } else {
        setIsLoggedIn(false);
        setLoggedInName('');
      }
    };

    checkLoginStatus();
    window.addEventListener('storage', checkLoginStatus);

    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    setIsLoggedIn(false);
    setLoggedInName('');
    navigate('/');
  };

  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/" className="custom-brand">Serenity Connect</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto custom-nav">
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/resource">Resources</Nav.Link>
            <Nav.Link as={Link} to="/gethelp">Get Help</Nav.Link>
           
            <NavDropdown title="Services" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/services/therapy">Therapy</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/services/paidcounseling">Counseling</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/services/support-groups">Support Groups</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/chat">Anonymous form</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/services/more">More</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            {isLoggedIn ? (
              <NavDropdown title={<><FontAwesomeIcon icon={faUser} className="nav-icon" /> {loggedInName}</>} id="profile-dropdown">
                <NavDropdown.Item as={Link} to="/profile">
                  <FontAwesomeIcon icon={faCog} className="nav-icon" /> Profile
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/appointmentuser">
                  <FontAwesomeIcon icon={faCalendar} className="nav-icon" /> Appointments
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/user-groups">
                  <FontAwesomeIcon icon={faUsers} className="nav-icon" /> User Groups
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/payment-history">
                  <FontAwesomeIcon icon={faMoneyCheckAlt} className="nav-icon" /> Payment History
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  <FontAwesomeIcon icon={faSignOutAlt} className="nav-icon" /> Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <NavDropdown title={<><FontAwesomeIcon icon={faUser} className="nav-icon" /> Login</>} id="login-dropdown">
                  <NavDropdown.Item as={Link} to="/user-login">Login as User</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/therapist-login">Login as Therapist</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title={<><FontAwesomeIcon icon={faUser} className="nav-icon" /> Signup</>} id="signup-dropdown">
                  <NavDropdown.Item as={Link} to="/user-signup">Signup as User</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/therapist-login">Signup as Therapist</NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
