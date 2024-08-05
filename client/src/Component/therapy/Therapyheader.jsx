import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import './therapyheader.css';

const TherapyHeader = () => {
  return (  
    <Container fluid className="therapy-container">
      <Row className="align-items-center">
        <Col md={6} className="image-col">
          <motion.div
            className="therapy-image-container"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.0 }}
          >
            <img src="https://i.pinimg.com/originals/5e/fd/42/5efd42b2f575158e8d2e2f26f50c257a.gif" alt="therapist-header" className="initial-image" />
          </motion.div>
        </Col>
        <Col md={6} className="text-col">
          <motion.div
            className="therapy-details"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <p>
              Welcome to our community of dedicated therapists! Our highly qualified professionals specialize in a wide range of mental health issues, offering compassionate and personalized care to meet your unique needs. Whether you're seeking support for anxiety, depression, relationship issues, or any other mental health concern, our therapists are here to help.
            </p>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
};

export default TherapyHeader;
