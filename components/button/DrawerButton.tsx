import React from 'react';
import styled from 'styled-components';
import { HamburgerIcon } from '@chakra-ui/icons';

const Container = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  cursor: pointer;
  padding: 0.5rem;
  margin: 0 3rem 0.5rem 0.5rem;
  max-height: 5rem;
  :hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const StyledButton = styled.button`
  background: none;
  color: white;
  margin-left: 1rem;
`;

const StyledHamburger = styled(HamburgerIcon)<{hasplayerselected:boolean}>`
  width: ${(props) => (props.hasplayerselected ? '2rem' : '1rem')};
  height: ${(props) => (props.hasplayerselected ? '2rem' : '1rem')};
`;

const Text = styled.p`
`;

interface IButton {
  text: string;
  action: () => void;
  hasPlayerSelected: boolean;
}

const DrawerButton = ({
  text,
  action,
  hasPlayerSelected,
}: IButton) => (
  <Container onClick={() => action()}>
    <StyledHamburger hasplayerselected={hasPlayerSelected ? true : undefined} />
    {!hasPlayerSelected ? <StyledButton type="button"><Text>{text}</Text></StyledButton> : null}
  </Container>

);

export default DrawerButton;
