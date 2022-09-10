import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: none;
  padding: 0.5rem;
  color: white;
  cursor: pointer;
  margin: 0.5rem;
  border-radius: 8px;
  :hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const Text = styled.p`
`;

interface IButton {
  text: string
  action: () => void;
}

const StandardButton = ({ text, action }: IButton) => (
  <StyledButton type="button" onClick={action}><Text>{text}</Text></StyledButton>
);

export default StandardButton;
