import React from 'react';
import dateFormat from 'dateformat';
import styled from 'styled-components';
import { IOnlyBossFight } from '../../interfaces';

const Item = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-evenly;
  margin: 1.5rem 0 0 0;
`;

const FightMetaData = ({
  name, kill, fightPercentage, startTime, endTime,
}: IOnlyBossFight) => (
  <Item>
    <p>
      Boss:
      {' '}
      {name}
    </p>
    <p>
      Time of Fight:
      {' '}
      {dateFormat(endTime - startTime, 'MM:ss')}
    </p>
    <p>
      Status:
      {' '}
      {kill ? 'Kill' : `HP left: ${fightPercentage}%`}
    </p>
  </Item>
);

export default FightMetaData;
