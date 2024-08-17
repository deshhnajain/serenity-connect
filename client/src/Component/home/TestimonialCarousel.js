//../Component/home/TestimonialCarousel.js
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

const TestimonialCarousel = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newTestimonial, setNewTestimonial] = useState({
    quote: "",
    author: "",
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await axios.get('https://serenity-connect.onrender.com/api/testimonials'); // Ensure this matches the route
      setTestimonials(response.data);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    }
  };

  const handleInputChange = (e) => {
    setNewTestimonial({ ...newTestimonial, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://serenity-connect.onrender.com/api/testimonials', newTestimonial); // Ensure this matches the route
      console.log('Submission response:', response.data);
      setShowForm(false);
      setNewTestimonial({ quote: "", author: "" });
      fetchTestimonials();
    } catch (error) {
      console.error("Error submitting testimonial:", error.response ? error.response.data : error.message);
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
      {!showForm && (
        <AddButton onClick={() => setShowForm(true)}>Add Comment</AddButton>
      )}
      {showForm && (
        <Form onSubmit={handleSubmit}>
          <TextArea
            name="quote"
            value={newTestimonial.quote}
            onChange={handleInputChange}
            placeholder="Your comment"
            required
          />
          <Input
            name="author"
            value={newTestimonial.author}
            onChange={handleInputChange}
            placeholder="Your name"
            required
          />
          <SubmitButton type="submit">Submit</SubmitButton>
          <CancelButton type="button" onClick={() => setShowForm(false)}>Cancel</CancelButton>
        </Form>
      )}
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

const AddButton = styled.button`
  background-color: #f39c12;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const Input = styled.input`
  width: 80%;
  padding: 10px;
  margin-bottom: 10px;
`;

const TextArea = styled.textarea`
  width: 80%;
  padding: 10px;
  margin-bottom: 10px;
  height: 100px;
`;

const SubmitButton = styled.button`
  background-color: #2ecc71;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  margin-right: 10px;
`;

const CancelButton = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
`;

export default TestimonialCarousel;
