import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import AboutImage1 from '../../imgs/aboutus/Screenshot 2024-07-28 162852.png'; // Initial image
import AboutImage2 from '../../imgs/aboutus/Screenshot 2024-07-28 162847.png'; // Image on hover
import './aboutheader.css';

const AboutUsHeader = () => {
  return (  
    <Container fluid className="about-container">
      {/* <Row className="justify-content-center mb-4">
        <Col md={8} className="text-center">
          <motion.h1
            className="about-heading"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            About Us
          </motion.h1>
        </Col>
      </Row> */}
      <Row className="align-items-center">
        <Col md={7}>
          <motion.div
            className="about-details"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
          
            <p>
              Serenity Connect is dedicated to providing a supportive and safe space for mental health support. We believe in fostering a community where everyone can find the resources they need to thrive.
            </p>
            
          </motion.div>
        </Col>
        <Col md={5}>
          <motion.div
            className="about-image-container"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.0 }}
          >
            <img src={AboutImage1} alt="About Us" className="initial-image" />
            <img src={AboutImage2} alt="About Us Hover" className="hover-image" />
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUsHeader;
