import styled from 'styled-components';
import dateFormat from 'dateformat';
import React from 'react';
import { IGuild, IPlayerDetails } from '../../interfaces/FightResponse';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Item = styled.div`
  min-width: 10rem;
  margin: 2rem;
`;

interface IBossToPlayerOverview {
  startTime: number;
  endTime: number;
  guild: IGuild;
  player: IPlayerDetails | null;
}

function BossToPlayerOverview({
  startTime,
  endTime,
  guild,
  player,
}: IBossToPlayerOverview) {
  return (
    <Container>
      <Item>
        <p>
          Duration of Fight:
        </p>
        <p>
          {dateFormat(endTime - startTime, 'MM:ss')}
        </p>
      </Item>
      <Item>
        <p> Guild: </p>
        <p>
          {guild.name}
        </p>
      </Item>
      {player && (
      <>
        <Item>
          <p> Player: </p>
          <p>
            {player.name}
          </p>
        </Item>
        <Item>
          <p> Spec: </p>
          <p>
            {player.specs[0]}
          </p>
        </Item>
      </>
      )}
    </Container>

  );
}

export default BossToPlayerOverview;
