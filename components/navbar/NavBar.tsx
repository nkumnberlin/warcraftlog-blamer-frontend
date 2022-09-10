import React from 'react';
import styled from 'styled-components';

const StyledNavBar = styled.nav`
  display: flex;
  flex-direction: row;
  height: 10rem;
  
  p{
    color: white;
    font-size: 1.25rem;
  }
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
    <ChildrenContainer>
      {children}
    </ChildrenContainer>
  </StyledNavBar>
);

export default NavBar;
