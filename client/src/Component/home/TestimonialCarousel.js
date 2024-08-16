import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

const TestimonialCarousel = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/testimonials');
      // Filter out testimonials that are not visible
      const visibleTestimonials = response.data.filter(t => t.isVisible);
      setTestimonials(visibleTestimonials);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Container>
      <Title>Testimonials</Title>
      <StyledSlider {...settings}>
        {testimonials.map((testimonial, index) => (
          <Testimonial key={index}>
            <Quote>{testimonial.quote}</Quote>
            <Author>{testimonial.author}</Author>
          </Testimonial>
        ))}
      </StyledSlider>
    </Container>
  );
};

const Container = styled.div`
  background-color: #ac3b61;
  color: #fff;
  padding: 50px;
  text-align: center;
  position: relative;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 30px;
`;

const StyledSlider = styled(Slider)`
  .slick-dots li button:before {
    color: #fff;
  }
`;

const Testimonial = styled.div`
  outline: none;
`;

const Quote = styled.p`
  font-size: 1.2rem;
  margin-bottom: 20px;
`;

const Author = styled.p`
  font-weight: bold;
  font-size: 1rem;
`;

export default TestimonialCarousel;
