import React, { useState, useEffect } from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const MyNavbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');
  const [loggedInName, setLoggedInName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = () => {
      const userId = localStorage.getItem('userId');
      const therapistId = localStorage.getItem('therapistId');
      
      if (userId) {
        setIsLoggedIn(true);
        setUserType('user');
        setLoggedInName(localStorage.getItem('loggedInUser') || 'User');
      } else if (therapistId) {
        setIsLoggedIn(true);
        setUserType('therapist');
        setLoggedInName(localStorage.getItem('loggedInTherapist') || 'Therapist');
      } else {
        setIsLoggedIn(false);
        setUserType('');
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
    localStorage.removeItem('userId');
    localStorage.removeItem('therapistId');
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('loggedInTherapist');
    setIsLoggedIn(false);
    setUserType('');
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
            <Nav.Link as={Link} to="/gethelp">Get Help</Nav.Link>
            <NavDropdown title="Services" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/services/therapy">Therapy</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/services/paidcounseling">Counseling</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/services/support-groups">Support Groups</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/services/more">More Services</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            {isLoggedIn ? (
              <>
                <Nav.Link as={Link} to={`/${userType}-dashboard`}>
                  <FontAwesomeIcon icon={faUser} className="nav-icon" /> {loggedInName}
                </Nav.Link>
                <Nav.Link onClick={handleLogout}>
                  <FontAwesomeIcon icon={faSignOutAlt} className="nav-icon" /> Logout
                </Nav.Link>
              </>
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