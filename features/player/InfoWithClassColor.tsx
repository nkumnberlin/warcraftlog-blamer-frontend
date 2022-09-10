import styled from 'styled-components';
import CLASS_COLORS from '../../constants/CLASS_COLORS';

const InfoWithClassColor = styled.p<{type?: string, smallElement?: boolean}>`
  padding: 0 0.5rem 0 0;
  min-width: ${(props) => (props.smallElement ? '2.5rem' : '10rem')};
  max-width: 15rem;
  color: ${(props) => CLASS_COLORS[props.type?.toLowerCase() as keyof typeof CLASS_COLORS]} !important;
`;

export { InfoWithClassColor };
