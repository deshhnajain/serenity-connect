import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TestimonialCarousel = () => {
  const testimonials = [
    {
      quote:
        "My classmates used to call me kaalu and because of this, i was having a tough time. thankyou Sernity-Connect for helping me in my tough times",
      author: "Ankur gupta",
      position: "Students pursuing BCA",
      company: "JIMS rohini",
    },
    // Add more testimonials here
    {
      quote:
        "koi ladki mujhe bhaoo nhi deti fir bhi mai unke baare mai baat krta rheta tha, thankyou sernity-connect for changing my point of view",
      author: "Ankur gupta",
      position: "Students pursuing BCA",
      company: "JIMS rohini",
    },
  ];

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
            <Position>{testimonial.position}</Position>
            <Company>{testimonial.company}</Company>
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

const Position = styled.p`
  font-size: 0.9rem;
  margin-bottom: 10px;
`;

const Company = styled.p`
  font-size: 0.9rem;
  color: #f39c12;
`;

export default TestimonialCarousel;
