import React from 'react';
import styled from 'styled-components';
import { features } from '../../features';

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
  margin-top: 1rem;
`;

const FeatureBullet = styled.div`
  display: flex;
  width: 30px;
  justify-content: center;
  align-items: center;
`;

const FeatureItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
`;

const FeatureBar = () => (
  <Container>
    <h2 style={{ margin: 0 }}>Filter Options:</h2>
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

export default FeatureBar;
