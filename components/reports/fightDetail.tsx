import dateFormat from 'dateformat';
import React from 'react';
import styled from 'styled-components';
import { IOnlyBossFight } from '../../interfaces';

const ListItem = styled.p`
  min-width: 10rem;
  max-width: 30rem;
`;

const FightDetails = ({
  name, kill, fightPercentage, startTime, endTime,
}: IOnlyBossFight) => (
  <>
    <ListItem>{name}</ListItem>
    <ListItem>
      {kill ? 'Kill' : `HP left: ${fightPercentage}%`}
    </ListItem>
    <ListItem>
      Time of Fight:
      {' '}
      {dateFormat(endTime - startTime, 'MM:ss')}
    </ListItem>
  </>
);
export default FightDetails;
