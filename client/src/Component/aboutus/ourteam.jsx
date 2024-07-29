import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ourteam.css';
import arshpreetImg from '../../imgs/aboutus/profile-pic.jpeg';
import placeholderImg from '../../imgs/aboutus/download.jpeg';
import deshnajain from '../../imgs/aboutus/Snapchat for Web 2023-9-10 at 12_19_45 PM.jpeg';

const teamMembers = [
  {
    name: 'Arshpreet Singh',
    role: 'Team Member',
    description: 'Great and good',
    img: arshpreetImg,
  },
  {
    name: 'Priyam',
    role: 'Team Member',
    description: "I don't know",
    img: placeholderImg,
  },
  {
    name: 'Yogesh',
    role: 'Team Member',
    description: 'He is a dedicated team member.',
    img: placeholderImg,
  },
  {
    name: 'Deshna Jain',
    role: 'Team Member',
    description: 'Lorem ipsum',
    img: deshnajain,
  },
];

const Ourteam = () => {
  const [showDetails, setShowDetails] = useState(Array(teamMembers.length).fill(false));

  const handleClick = (index) => {
    const newShowDetails = [...showDetails];
    newShowDetails[index] = !newShowDetails[index];
    setShowDetails(newShowDetails);
  };

  return (
    <Container fluid className="p-4 our-team-container">
      <h1 className="text-center mb-4 our-team-heading">Meet Our Team</h1>
      <br></br>
      <Row className="justify-content-center">
        {teamMembers.map((member, index) => (
          <Col key={index} md={3} className="mb-4">
            <Card className="team-card" onClick={() => handleClick(index)}>
              <Card.Img variant="top" src={member.img} alt={member.name} className="team-card-image" />
              {showDetails[index] && (
                <Card.Body className="team-card-body">
                  <Card.Title>{member.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{member.role}</Card.Subtitle>
                  <Card.Text>{member.description || 'No description available.'}</Card.Text>
                </Card.Body>
              )}
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Ourteam;
