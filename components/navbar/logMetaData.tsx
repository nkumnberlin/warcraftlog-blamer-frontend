import React from 'react';
import dateFormat from 'dateformat';
import styled from 'styled-components';
import { ISingleReport } from '../../interfaces';

const Item = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-evenly;
`;

const LogMetaData = ({
  startTime, endTime, guild, zone,
}: ISingleReport) => (
  <Item>
    <p>
      Zone:
      <br />
      {zone.name}
    </p>
    <p>
      From:
      <br />
      {dateFormat(startTime, 'HH:MM:ss')}
    </p>
    <p>
      Till:
      <br />
      {dateFormat(endTime, 'HH:MM:ss')}
    </p>
    <p>
      Faction:
      <br />
      {guild.faction.name}
    </p>
    <p>
      Guild:
      <br />
      {guild.name}
    </p>
  </Item>
);

export default LogMetaData;
