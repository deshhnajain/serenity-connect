import React from "react";
import styled from "styled-components";

const IntroductionWrapper = styled.section`
  padding: 50px 0;
  text-align: center;
  background: #f9f9f9;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }

  @media (max-width: 768px) {
    width: 80%;
    padding-top: 80%;
  }
`;

const Title = styled.h2`
  font-size: 36px;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 18px;
  max-width: 800px;
  margin: 0 auto;
`;

const Introduction = () => {
  return (
    <IntroductionWrapper>
      <Title>Introduction to Serenity-Connect</Title>
      <Description>
        In today's fast-paced world, mental health issues like anxiety,
        depression, and stress are becoming increasingly common. Many people
        face challenges accessing the necessary resources and professional help,
        often due to the stigma associated with seeking mental health support.
        Serenity Connect is here to change that. Our platform is designed to
        provide a comprehensive, accessible, and stigma-free environment for
        mental health support. With Serenity Connect, users can access a wealth
        of mental health resources, connect with licensed therapists, and join
        supportive communities, all in one place. By integrating resources,
        professional connections, and community engagement, Serenity Connect
        aims to be the go-to solution for mental wellness, helping individuals
        lead healthier, more balanced lives.
      </Description>
    </IntroductionWrapper>
  );
};

export default Introduction;
