import styled from 'styled-components';

const Info = styled.p<{type?: string, smallElement?: boolean}>`
  padding: 0 0.5rem 0 0;
  min-width: ${(props) => (props.smallElement ? '2.5rem' : '10rem')};
  max-width: 15rem;
  color: ${(props) => props.type};
`;

export { Info };
