// Overview.js

import React from 'react';
import styled from 'styled-components';

const OverviewContainer = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  width: 100%;
  max-width: 1200px;

`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
`;

const StatBox = styled.div`
  background-color: #2D286A;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-right: 1px solid #fff;
`;

const StatTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
    color: white;
`;

const StatValue = styled.p`
  font-size: 24px;
  font-weight: bold;
  color: #ED1B4A;
`;

const Status = () => {

  // Example stats data (replace with actual data from API or state)
  const statsData = [
    { title: 'Pickups', value: 8 },
    { title: 'In Transit', value: 8 },
    { title: 'Out of Delivery', value: 8 },
    { title: 'Delivered', value: 8 },
    { title: 'Undelivered', value: 8 },
    { title: 'RTO Transit', value: 8 },

    { title: 'RTO Transit', value: 8 },

  ];

  return (
    <OverviewContainer>
      <Header>
        <h2>COURIER STATUS</h2>
      </Header>
      <StatsContainer>
        {statsData.map((stat, index) => (
          <StatBox key={index}>
            <StatTitle>{stat.title}</StatTitle>
            <StatValue>{stat.value}</StatValue>
          </StatBox>
        ))}
      </StatsContainer>
    </OverviewContainer>
  );
};

export default Status;
