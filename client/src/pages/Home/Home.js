import React from "react";
import HeroSection from "../../Component/home/homeherosection";
import Services from "../../Component/home/Services";
import Introduction from "../../Component/home/homeintroduction";
import Middle from "../../Component/home/middle";
import TestimonialCarousel from "../../Component/home/TestimonialCarousel";
import IntroductionSection from "../../Component/home/IntroductionSection";
import Statistics from "../../Component/home/Statistics";
import "./Home.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    if (token) {
      localStorage.setItem('token', token);
      toast.success('Login successful');
      navigate('/');
    }
  }, [location, navigate]);
  return (
    <div className="home">
      <HeroSection />
      <Services />
      <Introduction />
      <IntroductionSection />
      <Middle />
      <Statistics />
      <TestimonialCarousel />
    </div>
  );
};

export default Home;
