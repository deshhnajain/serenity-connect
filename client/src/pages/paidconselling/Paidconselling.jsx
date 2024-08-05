import React from 'react';
import { Container, Grid, Card, CardContent, Typography, Button, Box } from '@mui/material';
import './paidconselling.css';
import { Link } from 'react-router-dom';
const PaidConsult = () => {
  return (
    <div className="paidconsult-container">
      <Container maxWidth={false} className="main-section">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6} className="text-section">
            <Typography variant="h1" gutterBottom>
              Focus on Your Mental Health First
            </Typography>
            <Typography variant="body1" gutterBottom>
              When you show the courage to heal and grow, everyone around you benefits.
            </Typography>
            <Typography variant="body1" gutterBottom>
              We offer paid consultation through video/telephone to provide the necessary support in improving your mental wellbeing.
            </Typography>
            <Typography variant="body1" gutterBottom>
              Regular consultation with experts of your choice.
            </Typography>
            <Typography variant="body1" gutterBottom>
              Cost: Starting at Rs. 500 per session
            </Typography>
            <Typography variant="body1" gutterBottom>
              Duration: 45 minutes - 1 hour
            </Typography>
            <Button variant="contained" color="primary" size="large" className="btn" as={Link} to="/services/therapy">
              Book a Session
            </Button>
          </Grid>
          <Grid item xs={12} md={6} className="image-section">
            <img src="https://i.pinimg.com/originals/8a/df/17/8adf17db3faaa19dfd010850afd0c0ae.gif" alt="Doctor" />
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth={false} className="how-it-works-section">
        <Typography variant="h2" gutterBottom>
          How It Works
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card className="how-it-works-card">
              <CardContent>
                <Typography variant="h6">Step 1: Choose Your Therapist</Typography>
                <Typography variant="body2" color="textSecondary">
                  Browse through our list of qualified therapists and select the one that best suits your needs.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card className="how-it-works-card">
              <CardContent>
                <Typography variant="h6">Step 2: Schedule Your Session</Typography>
                <Typography variant="body2" color="textSecondary">
                  Pick a convenient date and time for your session and book it easily through our platform.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card className="how-it-works-card">
              <CardContent>
                <Typography variant="h6">Step 3: Start Your Journey</Typography>
                <Typography variant="body2" color="textSecondary">
                  Join your session through video or telephone and start your journey to better mental health.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth={false} className="network-section">
        <Typography variant="h2" gutterBottom>
        Our Network
        </Typography>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6} className="network-text-section">
            <Typography variant="body1" gutterBottom>
              We are associated with a highly qualified team of some of the best names in Psychology who come with years of experience in providing excellent care.
            </Typography>
            <br></br>
            <Typography variant="body1" gutterBottom>
              Our consultants cover a range of specific areas to meet your concerns:
            </Typography>
            <br></br>
            <ul>
              <li>Depression</li>
              <li>Anxiety</li>
              <li>Relationship issues</li>
              <li>Grief</li>
              <li>Alcohol/Substance addiction</li>
              <li>Post-Traumatic stress</li>
              <li>Study-related concerns</li>
              <li>Eating/Sleep-related issues</li>
              <li>Job/Career</li>
            </ul>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box className="image-carousel">
              <img src="https://media.tenor.com/ltsFl5J3PcEAAAAi/mental-health-wellbeing.gif" alt="Expert 3" />
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth={false} className="testimonials-section">
        <Typography variant="h2" gutterBottom>
          What Our Clients Say
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card className="testimonial-card">
              <CardContent>
                <Typography variant="h6">John Doe</Typography>
                <Typography variant="body2" color="textSecondary">
                  "The sessions have greatly improved my mental health."
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card className="testimonial-card">
              <CardContent>
                <Typography variant="h6">Jane Smith</Typography>
                <Typography variant="body2" color="textSecondary">
                  "I feel much better after talking to my therapist."
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card className="testimonial-card">
              <CardContent>
                <Typography variant="h6">Alice Johnson</Typography>
                <Typography variant="body2" color="textSecondary">
                  "Highly recommend these professionals."
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth={false} className="call-to-action-section">
        <Typography variant="h2" gutterBottom>
          Ready to Improve Your Mental Health?
        </Typography>
        <Typography variant="body1" gutterBottom>
          Don't wait any longer. Book your session today and take the first step towards a healthier, happier you.
        </Typography>
        <Button variant="contained" color="secondary" size="large" className="btn" as={Link} to="/services/therapy">
          Book a Session Now
        </Button>
      </Container>
    </div>
  );
};

export default PaidConsult;
