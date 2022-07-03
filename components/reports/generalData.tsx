import React from 'react';
import dateFormat from 'dateformat';
import styled from 'styled-components';
import { ISingleReport } from '../../interfaces/Raid';

const Item = styled.div<{ isListItem?: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  border-bottom: ${(props) => (props.isListItem ? '1px solid rgba(255, 255, 255, 0.2)' : '')};
  margin: 1rem 0 1rem 0;
`;
const GeneralData = ({
  startTime, endTime, guild, zone,
}: ISingleReport) => (
  <Item>
    <p>
      {zone.name}
    </p>
    <p>
      From:
      {' '}
      {dateFormat(startTime, 'dS, mmmm, yyyy, HH:MM:ss')}
    </p>
    <p>
      Till:
      {' '}
      {dateFormat(endTime, 'dS, mmmm, yyyy, HH:MM:ss')}
    </p>
    <p>
      Faction:
      {guild.faction.name}
    </p>
    <p>
      Guild:
      {guild.name}
    </p>
  </Item>
);

export default GeneralData;
