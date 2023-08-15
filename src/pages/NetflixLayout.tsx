import React from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';

const NetflixLayout: React.FC = () => {
  return (
    <Container>
      <Navbar />
    </Container>
  );
};

const Container = styled.div`
  
`;

export default NetflixLayout;