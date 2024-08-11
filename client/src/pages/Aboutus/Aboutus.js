import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Aboutus.css';
import Ourteam from '../../Component/aboutus/ourteam';
import OurMission from '../../Component/aboutus/ourmission';
import OurVision from '../../Component/aboutus/Ourvision';
import WhatWeDo from '../../Component/aboutus/Whatwedo';
import Aboutusheader from '../../Component/aboutus/aboutusheader';
// import Footer from '../../Component/footer/footer';
// import Aboutuscarousel from '../Component/aboutus/aboutuscarousel';

const AboutUs = () => {
  return (
    <>
      {/* <Aboutuscarousel/> */}
      <Container fluid className="about-container">
        <Row className="text-center mb-4">
          <Col>
            <Aboutusheader />
          </Col>
          <Row className="mb-4">
            <Col>
              <WhatWeDo />
            </Col>
          </Row>
        </Row>
        <Row className="mb-4">
          <Col md={6} >
            <OurMission />
          </Col>
          <Col md={6}>
            <OurVision />
          </Col>
        </Row>
        <Row className="mb-4">
          <Col>
            <Ourteam />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AboutUs;
