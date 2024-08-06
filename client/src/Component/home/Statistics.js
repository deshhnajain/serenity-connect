import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import CountUp from "react-countup";
import {
  FaUserAlt,
  FaStar,
  FaHandshake,
  FaClock,
  FaClipboardCheck,
  FaUserCheck,
  FaBed,
} from "react-icons/fa";

const StatisticsWrapper = styled.section`
  background: #f8f9fa;
  padding: 50px 0;
  text-align: center;
`;

const StatsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

const StatItem = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 200px;
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }

  @media (max-width: 768px) {
    width: 80%;
  }
`;

const StatIcon = styled.div`
  font-size: 40px;
  margin-bottom: 10px;
`;

const StatNumber = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const StatDescription = styled.div`
  font-size: 14px;
  color: #555;
`;

const statsData = [
  {
    icon: FaUserAlt,
    number: 20,
    description: "Years of Experience",
    suffix: "+",
  },
  { icon: FaStar, number: 15, description: "Experts", suffix: "+" },
  {
    icon: FaHandshake,
    number: 100000,
    description: "Consultation",
    suffix: "",
  },
  { icon: FaClock, number: 10000, description: "Therapy Hours", suffix: "+" },
  {
    icon: FaClipboardCheck,
    number: 75,
    description: "Clients report improvement in their concern within 12 weeks",
    suffix: "%",
  },
  {
    icon: FaUserCheck,
    number: 70,
    description: "Clients have their first counseling session within a week",
    suffix: "%",
  },
  {
    icon: FaBed,
    number: 97,
    description: "Relapse patients did not need hospitalization",
    suffix: "%",
  },
  {
    icon: FaUserAlt,
    number: 48000,
    description: "Client sessions done so far",
    suffix: "+",
  },
];

const Statistics = () => {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        } else {
          setInView(false);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <StatisticsWrapper ref={ref}>
      <h2>Why choose us ?</h2>
      <StatsContainer>
        {statsData.map((stat, index) => (
          <StatItem key={index}>
            <StatIcon as={stat.icon} />
            <StatNumber>
              {inView && (
                <CountUp
                  start={0}
                  end={stat.number}
                  duration={4}
                  suffix={stat.suffix}
                />
              )}
            </StatNumber>
            <StatDescription>{stat.description}</StatDescription>
          </StatItem>
        ))}
      </StatsContainer>
    </StatisticsWrapper>
  );
};

export default Statistics;
