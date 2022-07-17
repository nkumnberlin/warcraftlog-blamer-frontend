import React from 'react';
import styled from 'styled-components';
import { features } from './index';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;

  @media(max-width: 1200px){
    width: 100%;
    margin-top: 3rem;
  }
`;

const FeatureContainer = styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;
  padding: 1rem;
  
  :hover {
    background: #444444;
  }
`;

const FeatureBullet = styled.div`
  display: flex;
  width: 15%;
  justify-content: center;
  align-items: center;
`;

const FeatureItem = styled.div`
  display: flex;
  flex-direction: column;
`;
const FeatureFilter = () => (
  <Container>
    <h2>Filter Options:</h2>
    {features.map(({ name, description }) => (
      <FeatureContainer key={name}>
        <FeatureBullet>*</FeatureBullet>
        <FeatureItem>
          <b>{name}</b>
          <p>{description}</p>
        </FeatureItem>
      </FeatureContainer>
    ))}
  </Container>
);

export default FeatureFilter;
