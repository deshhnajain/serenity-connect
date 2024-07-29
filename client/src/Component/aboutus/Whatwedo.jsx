import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import './whatwedo.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import testimg from '../../imgs/aboutus/download.jpeg';

const WhatWeDo = () => {
  return (
    <Container fluid className="what-we-do-container">
      <Row className="justify-content-center">
        <Col md={8} className="text-center">
          <motion.h2
            className="what-we-do-heading"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            What We Do
          </motion.h2>
          <br></br>
          <motion.p
            className="what-we-do-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            At Serenity Connect, we focus on providing comprehensive mental health support through various means.
          </motion.p>
        </Col>
      </Row>
      

      <Row className="cards-container">
        <Col md={4}>
          <Card sx={{ maxWidth: 345 }} className="cards">
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              image={testimg}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over 6,000
                species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </Card>
        </Col>
        <Col md={4}>
          <Card sx={{ maxWidth: 345 }} className="cards">
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              image={testimg}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over 6,000
                species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </Card>
        </Col>
        <Col md={4}>
          <Card sx={{ maxWidth: 345 }} className="cards">
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              image={testimg}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over 6,000
                species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default WhatWeDo;
