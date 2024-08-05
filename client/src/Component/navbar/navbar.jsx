import React, { useState, useEffect } from 'react';
import { Navbar, Nav, NavDropdown, Container, Form, FormControl, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the custom CSS

const MyNavbar = () => {
  // State to manage login status
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isTherapistLoggedIn, setIsTherapistLoggedIn] = useState(false);
  const [loggedInName, setLoggedInName] = useState('');

  useEffect(() => {
    // Check if user or therapist is logged in (replace with your actual authentication check)
    const userLoggedInStatus = !!localStorage.getItem('userId'); // Example check
    const therapistLoggedInStatus = !!localStorage.getItem('therapistId'); // Example check
    const userName = localStorage.getItem('loggedInUser');
    const therapistName = localStorage.getItem('loggedInTherapist');

    setIsUserLoggedIn(userLoggedInStatus);
    setIsTherapistLoggedIn(therapistLoggedInStatus);

    if (userLoggedInStatus) {
      setLoggedInName(userName);
    } else if (therapistLoggedInStatus) {
      setLoggedInName(therapistName);
    }
  }, []);

  const handleLogout = () => {
    // Clear user session and update login status
    localStorage.removeItem('userId');
    localStorage.removeItem('therapistId');
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('loggedInTherapist');
    setIsUserLoggedIn(false);
    setIsTherapistLoggedIn(false);
    setLoggedInName('');
  };

  return (
    <Navbar expand="lg" className="custom-navbar shadow-sm p-3 mb-5 rounded">
      <Container>
        <Navbar.Brand as={Link} to="/" className="custom-brand">Serenity Connect</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto custom-nav">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <NavDropdown title="Services" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/services/therapy">Therapy</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/services/paidcounseling">Counseling</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/services/support-groups">Support Groups</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/services/more">More Services</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex mx-2 custom-form">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-light"><FontAwesomeIcon icon={faSearch} /></Button>
          </Form>
          <Nav>
            {isUserLoggedIn ? (
              <>
                <Nav.Link as={Link} to="/user-dashboard"><FontAwesomeIcon icon={faUser} /> {loggedInName}</Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            ) : isTherapistLoggedIn ? (
              <>
                <Nav.Link as={Link} to="/therapist-dashboard"><FontAwesomeIcon icon={faUser} /> {loggedInName}</Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/user-login"><FontAwesomeIcon icon={faUser} /> Login as User</Nav.Link>
                <Nav.Link as={Link} to="/user-signup"><FontAwesomeIcon icon={faUser} /> Signup as User</Nav.Link>
                <Nav.Link as={Link} to="/therapist-login"><FontAwesomeIcon icon={faUser} /> Login as Therapist</Nav.Link>
                <Nav.Link as={Link} to="/therapist-signup"><FontAwesomeIcon icon={faUser} /> Signup as Therapist</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
