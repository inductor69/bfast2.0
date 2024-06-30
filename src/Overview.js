// Overview.js

import React, { useState } from 'react';
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
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
`;

const StatBox = styled.div`
  background-color: #2D286A;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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

const DatePicker = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
`;

const Overview = () => {
  const [selectedDate, setSelectedDate] = useState('');

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    // Implement functionality to fetch data based on selected date
  };

  // Example stats data (replace with actual data from API or state)
  const statsData = [
    { title: 'Total Shipments', value: 120 },
    { title: 'Total Cost', value: 20400 },
    { title: 'Avg Daily Couriers', value: 12 },
    { title: 'Avg Delivery Time(D)', value: 3 },
    { title: 'Avg Courier Cost', value: 172 },
  ];

  return (
    <OverviewContainer>
      <Header>
        <h2>OVERVIEW</h2>
        <DatePicker
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
        />
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

export default Overview;
