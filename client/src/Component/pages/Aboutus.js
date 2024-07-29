import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import './Aboutus.css';
import Ourteam from '../aboutus/ourteam';
import OurMission from '../aboutus/ourmission';
// import Aboutuscarousel from '../Components/aboutuscarousel';
import OurVision from '../aboutus/Ourvision';
import WhatWeDo from '../aboutus/Whatwedo';
import Aboutusheader from '../aboutus/aboutusheader';

const AboutUs = () => {
  return (
    <Container fluid className="about-container">
      <Row className="text-center mb-4">
        {/* <Col>
        <Aboutuscarousel />
        </Col> */}

        <Col>
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
        <Aboutusheader/>
          </motion.h1>
        </Col>
        <Row className="mb-4">
        <Col>
          <motion.div
            className="about-section"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <WhatWeDo />
          </motion.div>
        </Col>
      </Row>
      </Row>
      <Row className="mb-4">
        <Col md={6}>
          <motion.div
            className="about-section"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <OurMission />
          </motion.div>
        </Col>
        <Col md={6}>
          <motion.div
            className="about-section"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <OurVision />
          </motion.div>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <motion.div
            className="about-section"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Ourteam />
          </motion.div>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <motion.div
            className="about-section"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2>Contact Us</h2>
            <p>
              If you have any questions or would like to get in touch, please reach out to us at <a href="mailto:contact@serenityconnect.com">contact@serenityconnect.com</a>. We would love to hear from you!
            </p>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUs;
