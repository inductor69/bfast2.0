import React, { useState } from 'react';
import styled from 'styled-components';
import { MdSearch, MdCancel } from 'react-icons/md';
import Header from './Header';
import Overview from './Overview';
import Status from './Status';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TrackerContainer = styled.div`
  background-color: #f2f2f2;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 600px;
  max-width: 90%;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Input = styled.input`
  border: 1px solid #ccc;
  padding: 10px;
  flex: 1;
  border-radius: 4px 0 0 4px;
  font-size: 16px;
`;

const SearchButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 0 4px 4px 0;
  font-size: 16px;
`;

const TrackingDetails = styled.div`
  margin-top: 20px;
`;

const Milestone = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const MilestoneIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #4caf50;
  color: white;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 20px;
`;

const MilestoneContent = styled.div`
  margin-left: 20px;
`;

const MilestoneTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const MilestoneText = styled.div`
  color: #666;
`;

const ClearButton = styled.button`
  background-color: #ED1B4A;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 0 4px 4px 0;
  font-size: 16px;
`;

const ShipmentTracker = () => {
  const [awbNumber, setAwbNumber] = useState('');
  const [trackingInfo, setTrackingInfo] = useState(null);
  const [error, setError] = useState(null);

  const handleTrackShipment = () => {
    const options = {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json'
      },
      body: JSON.stringify({ awb: awbNumber })
    };

    fetch('https://api.couriero.in/public/awb-track-details', options)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(response => {
        console.log(response);
        if (response.status === 'success') {
          setTrackingInfo(response.data);
        } else {
          setError('Tracking information not found');
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Failed to fetch tracking information. Please try again later.');
      });
  };

  const handleClearTracking = () => {
    setTrackingInfo(null);
    setError(null);
    setAwbNumber('');
  };

  return (
    <Container>
      <Header />
      <Overview />
      <Status />
      <h2 style={{ textAlign: 'left', maxWidth: '1200px', margin: '20px 0' }}>ORDER DETAILS</h2>
      <TrackerContainer>
        <InputContainer>
          <Input
            type="text"
            placeholder="Enter AWB number"
            value={awbNumber}
            onChange={(e) => setAwbNumber(e.target.value)}
          />
          <SearchButton onClick={handleTrackShipment}>
            <MdSearch />
          </SearchButton>
          <ClearButton onClick={handleClearTracking}><MdCancel/></ClearButton>

        </InputContainer>
        {error && <p>{error}</p>}
        {trackingInfo && (
          <div>
            <h3>Shipment Details:</h3>
            <p><strong>AWB:</strong> {trackingInfo.awb}</p>
            <p><strong>Order ID:</strong> {trackingInfo.orderId}</p>
            <p><strong>Company Name:</strong> {trackingInfo.companyName}</p>
            <p><strong>Shipment Status:</strong> {trackingInfo.shipmentStatus}</p>
            <TrackingDetails>
              <h3>Tracking Milestones:</h3>
              {trackingInfo?.tracking?.map((event, index) => (
                <Milestone key={index}>
                  <MilestoneIcon>
                    {index + 1}
                  </MilestoneIcon>
                  <MilestoneContent>
                    <MilestoneTitle>{event.scanType}</MilestoneTitle>
                    <MilestoneText>{event.scanDetail}</MilestoneText>
                    <MilestoneText><strong>Location:</strong> {event.scanLocation}</MilestoneText>
                    <MilestoneText><strong>Date:</strong> {new Date(event.scanDate).toLocaleString()}</MilestoneText>
                  </MilestoneContent>
                </Milestone>
              ))}
            </TrackingDetails>
          </div>
        )}
      </TrackerContainer>
    </Container>
  );
};

export default ShipmentTracker;
