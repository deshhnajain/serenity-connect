import React, { useState, useEffect } from 'react';
import { Navbar, Nav, NavDropdown, Container, Form, FormControl, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the custom CSS

const MyNavbar = () => {
  // State to manage login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in (replace with your actual authentication check)
    const loggedInStatus = !!localStorage.getItem('therapistId'); // Example check
    setIsLoggedIn(loggedInStatus);
  }, []);

  const handleLogout = () => {
    // Clear user session and update login status
    localStorage.removeItem('therapistId');
    setIsLoggedIn(false);
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
            {isLoggedIn ? (
              <>
                <Nav.Link as={Link} to="/therapist-dashboard"><FontAwesomeIcon icon={faUser} /> View Profile</Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/therapist-login"><FontAwesomeIcon icon={faUser} /> Login as a therapist</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
