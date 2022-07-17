import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

const StyledNavBar = styled.nav`
  display: flex;
  flex-direction: row;
  height: 10rem;
  background: #f5f5f5;
  
  p{
    color: black;
    font-size: 1.25rem;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const ChildrenContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

interface INavBar {
    children: React.ReactNode
}

const NavBar = ({ children }: INavBar) => (
  <StyledNavBar>
    <ImageContainer>
      <Image src="/blamer.webp" alt="Blamer Icon" objectFit="cover" quality={100} width="300px" height="250px" />
    </ImageContainer>
    <ChildrenContainer>
      {children}
    </ChildrenContainer>
  </StyledNavBar>
);

export default NavBar;