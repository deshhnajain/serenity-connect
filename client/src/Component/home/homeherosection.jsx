import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HeroSection = () => {
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <section style={styles.hero}>
      <Slider {...carouselSettings} style={styles.slider}>
        <div>
          <img
            src="C:\Users\Chetna Chauhan\OneDrive\Desktop\images\slide1.png"
            alt="Slide 1"
            style={styles.carouselImage}
          />
        </div>
        <div>
          <img
            src="path-to-image2.jpg"
            alt="Slide 2"
            style={styles.carouselImage}
          />
        </div>
        <div>
          <img
            src="path-to-image3.jpg"
            alt="Slide 3"
            style={styles.carouselImage}
          />
        </div>
        <div>
          <img
            src="path-to-image4.jpg"
            alt="Slide 4"
            style={styles.carouselImage}
          />
        </div>
        <div>
          <img
            src="path-to-image5.jpg"
            alt="Slide 5"
            style={styles.carouselImage}
          />
        </div>
      </Slider>
    </section>
  );
};

const styles = {
  hero: {
    width: "100%",
    height: "90vh",
    overflow: "hidden",
  },
  slider: {
    width: "100%",
    height: "100%",
  },
  carouselImage: {
    width: "100%",
    height: "60vh",
    objectFit: "cover",
  },
};

export default HeroSection;
