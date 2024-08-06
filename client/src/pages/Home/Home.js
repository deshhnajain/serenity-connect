import React from "react";
  import Header from "../../Component/home/homeheader";
  import HeroSection from "../../Component/home/homeherosection";
  import Services from "../../Component/home/Services";
  import Introduction from "../../Component/home/homeintroduction";
  import Middle from "../../Component/home/middle";
  import TestimonialCarousel from "../../Component/home/TestimonialCarousel";
  import IntroductionSection from "../../Component/home/IntroductionSection";
  import Statistics from "../../Component/home/Statistics";
  import "./Home.css";
  const Home = () => {
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
  