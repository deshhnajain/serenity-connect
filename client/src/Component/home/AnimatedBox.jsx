import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import { useInView } from "react-intersection-observer";

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Box = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 20px;
  width: 250px;
  height: auto;
  text-align: center;
  transition: all 0.3s ease-in-out, box-shadow 0.3s, transform 0.3s;

  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    width: 80%;
    padding-top: 80%;
    opacity: 0;
  }

  ${(props) =>
    props.inView &&
    css`
      opacity: 1;
      animation: ${fadeInUp} 0.5s ease-out forwards;
    `}
`;

const Icon = styled.div`
  font-size: 2rem;
  margin-bottom: 10px;
`;

const Title = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 10px;
`;

const AnimatedBox = ({ icon, title, description }) => {
  const [key, setKey] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      setKey((prevKey) => prevKey + 1);
    }
  }, [inView]);

  return (
    <Box ref={ref} inView={inView} key={key}>
      <Icon>{icon}</Icon>
      <Title>{title}</Title>
      <p>{description}</p>
    </Box>
  );
};

export default AnimatedBox;
