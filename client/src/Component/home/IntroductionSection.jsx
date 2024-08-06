import React from "react";
import styled from "styled-components";
import AnimatedBox from "./AnimatedBox";

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 50px;
  background-color: #f9f9f9;
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
  text-align: center;
  margin-bottom: 40px;
  font-size: 2rem;
`;

const IntroductionSection = () => {
  const items = [
    {
      icon: "📄",
      title: "Things to take care of while being on work",
      description:
        "At work, take care of your mental health by setting boundaries, taking breaks, staying organized, and seeking support when needed.",
    },
    {
      icon: "📊",
      title: "Maintaining the work-life balance",
      description:
        "Maintaining work-life balance involves setting boundaries, prioritizing tasks, taking regular breaks, and ensuring time for personal activities and self-care.",
    },
    {
      icon: "❓",
      title: "How to approach a problem",
      description:
        "clearly define the issue, gather relevant information,  understand its context and specify the impact and objectives.",
    },
    {
      icon: "✏️",
      title: "How to work on that problem",
      description:
        "To work on a problem, analyze the issue, gather information, brainstorm solutions, implement a plan, and evaluate the results.",
    },
    {
      icon: "🧠",
      title: "How to stay stable at tough times",
      description:
        "Stay stable during tough times by practicing self-care, seeking support, staying positive, and focusing on small, manageable steps.",
    },
  ];

  return (
    <Container>
      <Title>What are our key focus areas on Mental Health?</Title>

      {items.map((item, index) => (
        <AnimatedBox
          key={index}
          icon={item.icon}
          title={item.title}
          description={item.description}
        />
      ))}
    </Container>
  );
};

export default IntroductionSection;
