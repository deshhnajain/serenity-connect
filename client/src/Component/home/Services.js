import React from "react";
import styled from "styled-components";
import {
  FaUserAlt,
  FaHeartbeat,
  FaBriefcase,
  FaLaptopCode,
  FaBed,
} from "react-icons/fa";

const ServicesWrapper = styled.section`
  background: #eee2dc;
  padding: 50px 0;
  text-align: center;
  position: relative;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }

  @media (max-width: 768px) {
    width: 80%;
  }
`;

const ServiceList = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
`;

const ServiceItem = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 200px;
  height: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }

  @media (max-width: 768px) {
    width: 80%;
  }
`;

const ServiceIcon = styled.div`
  font-size: 40px;
  margin-bottom: 10px;
`;

const ServiceTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
`;

const ServiceDescription = styled.p`
  font-size: 14px;
  text-align: center;
`;

const Services = () => {
  const services = [
    {
      title: "Isolation",
      description:
        "Limited social interaction can lead to loneliness and exacerbate mental health issues. It reduces emotional support and connection.",
      icon: FaUserAlt,
    },
    {
      title: "Neglect",
      description:
        "Ignoring personal care and emotional needs can worsen mental health. It often results in increased anxiety and depression.",
      icon: FaHeartbeat,
    },
    {
      title: "Stress",
      description:
        "Persistent pressure can overwhelm your mind and body, leading to burnout. It disrupts daily functioning and overall well-being.",
      icon: FaBriefcase,
    },
    {
      title: "Overwork",
      description:
        "Long hours and high workloads can cause extreme fatigue and burnout. It negatively impacts mental health and productivity.",
      icon: FaLaptopCode,
    },
    {
      title: "Unrest",
      description:
        "Poor sleep and constant worry disrupt mental stability. It leads to decreased focus, irritability, and overall distress.",
      icon: FaBed,
    },
  ];

  return (
    <ServicesWrapper>
      <ServiceList>
        {services.map((service, index) => (
          <ServiceItem key={index}>
            <ServiceIcon as={service.icon} />
            <ServiceTitle>{service.title}</ServiceTitle>
            <ServiceDescription>{service.description}</ServiceDescription>
          </ServiceItem>
        ))}
      </ServiceList>
    </ServicesWrapper>
  );
};

export default Services;
