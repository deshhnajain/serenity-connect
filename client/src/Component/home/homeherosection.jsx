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
            src="https://blog-assets.freshworks.com/freshsales-crm/wp-content/uploads/2020/07/20132702/Mental-health-in-sales.gif"
            alt="Slide 1"
            style={styles.carouselImage}
          />
        </div>
        <div>
          <img
            src="https://static.wixstatic.com/media/1e81fc_39db906744204005b907291c4db2ce87~mv2.gif"
            alt="Slide 2"
            style={styles.carouselImage}
          />
        </div>
        <div>
          <img
            src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/e583bf71503887.5bc7a3379f8fb.gif"
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
    overflow: "hidden",
  },
  slider: {
    width: "100%",
  },
  carouselImage: {
    width: "100%",
    height: "60vh",
    objectFit: "cover",
  },
};

export default HeroSection;
