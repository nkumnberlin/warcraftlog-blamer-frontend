import React from 'react';
import dateFormat from 'dateformat';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { IOnlyBossFights } from '../../interfaces';

const Item = styled.div<{ isListItem?: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  cursor: pointer;
  border-bottom: ${(props) => (props.isListItem ? '1px solid rgba(255, 255, 255, 0.2)' : '')};
`;

const Reports = styled.div`
  margin-top: 2rem;
`;

const ListItem = styled.p`
  min-width: 10rem;
  max-width: 30rem;
`;
const BossReport = ({
  onlyBossFights,
}: IOnlyBossFights) => {
  const router = useRouter();
  return (
    <Reports>
      {onlyBossFights.map((fight) => (
        <Item
          isListItem
          key={fight.id}
          onClick={() => router.push({
            pathname: `${router.asPath}`,
            query: { encounterID: fight.encounterID, fight: fight.id },
          })}
        >
          <ListItem>{fight.name}</ListItem>
          <ListItem>
            {fight.kill ? 'Kill' : `Try; HP left: ${fight.fightPercentage}%`}
          </ListItem>
          <ListItem>
            Time of Fight:
            {' '}
            {dateFormat(fight.startTime + fight.endTime, 'HH:MM:ss')}
          </ListItem>
        </Item>
      ))}
    </Reports>
  );
};

export default BossReport;
