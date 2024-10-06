import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

// Keyframes for the animations
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

// Styled components for the page layout
const Wrapper = styled.div`
  display: flex;
  margin-top:100px;
  width: 1500px;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #ff7e5f, #feb47b);
  font-family: 'Roboto', sans-serif;
  color: #fff;
  animation: ${fadeIn} 1s ease-in-out;
`;

const Content = styled.div`
  text-align: center;
  background: rgba(0, 0, 0, 0.6);
  padding: 50px;
  border-radius: 15px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.2);
  animation: ${slideIn} 1s ease-in-out;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 20px;
  letter-spacing: 2px;
`;

const Message = styled.p`
  font-size: 1.2rem;
  margin-bottom: 30px;
`;

const Countdown = styled.div`
  font-size: 2rem;
  font-weight: bold;
`;

const NotAvailablePage = () => {
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    if (countdown === 0) {
      navigate('/');
    }

    return () => clearInterval(timer);
  }, [countdown, navigate]);

  return (
    <Wrapper>
      <Content>
        <Title>Page Not Available</Title>
        <Message>This page is currently unavailable. You will be redirected to the home page shortly.</Message>
        <Countdown>Redirecting in {countdown} seconds...</Countdown>
      </Content>
    </Wrapper>
  );
};

export default NotAvailablePage;
