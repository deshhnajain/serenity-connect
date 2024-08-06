import React from "react";
import styled from "styled-components";

const Middle = () => {
  const items = [
    {
      title: "Mental Support 24x7",
      description: "Free Mental health support service available here 24x7",
      link: "#",
    },
    {
      title: "Paid Consultant",
      description: "Paid Consultancy Session just customized for you",
      link: "#",
    },
    {
      title: "Mental Health Test",
      description:
        "Check your mental health score now and know more about yourselves",
      link: "#",
    },
    {
      title: "Mental Health Games",
      description:
        "Play games that will help you to understand more about your mental health",
      link: "#",
    },
  ];

  return (
    <Container>
      <LeftSection>
        <Title>When Mental health is prioritized like physical health</Title>
        <Subtitle>Success Happens</Subtitle>
        <Description>
          Serenity Connect is dedicated to providing ongoing, comprehensive
          support for your mental health, ensuring you have the tools and
          resources needed to maintain well-being throughout your life. Our
          platform offers a diverse range of features designed to cater to your
          individual needs. With access to a rich library of mental health
          resources, you can educate yourself on various topics and strategies
          for managing stress, anxiety, and other challenges. Serenity Connect
          connects you with licensed therapists, facilitating personalized,
          professional guidance that fits your schedule and preferences. In
          addition to one-on-one therapy, Serenity Connect fosters a supportive
          community through real-time support groups and anonymous discussion
          forums, where you can share experiences, seek advice, and receive
          encouragement from others who understand your journey. Our interactive
          self-assessment tools allow you to regularly monitor your mental
          health and track progress, while personalized wellness tips offer
          actionable insights tailored to your unique situation. By integrating
          these elements into a user-friendly platform, Serenity Connect ensures
          that mental health support is always accessible, allowing you to stay
          proactive and engaged in your well-being. Whether you're seeking
          immediate support or long-term strategies for maintaining balance,
          Serenity Connect provides a holistic approach to mental health care,
          helping you navigate life's challenges with resilience and confidence.
        </Description>
      </LeftSection>
      <RightSection>
        {items.map((item, index) => (
          <Circle key={index} href={item.link}>
            <CircleContent>
              <CircleTitle>{item.title}</CircleTitle>
              <CircleDescription>{item.description}</CircleDescription>
              <LearnMore>Learn More ➔</LearnMore>
            </CircleContent>
          </Circle>
        ))}
      </RightSection>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 50px;
  background-color: #123c69;
  color: #fff;
`;

const LeftSection = styled.div`
  flex: 1;
  padding-right: 50px;
`;

const Title = styled.h1`
  font-size: 36px;
  margin-bottom: 20px;
`;

const Subtitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 16px;
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const Circle = styled.a`
  display: block;
  width: 40%;
  padding-top: 40%;
  margin-bottom: 20px;
  background-color: #fff;
  color: #000;
  border-radius: 50%;
  text-align: center;
  text-decoration: none;
  position: relative;
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

const CircleContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CircleTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
`;

const CircleDescription = styled.p`
  font-size: 14px;
  margin-bottom: 20px;
`;

const LearnMore = styled.span`
  font-size: 14px;
  color: #e74c3c;
`;

export default Middle;
