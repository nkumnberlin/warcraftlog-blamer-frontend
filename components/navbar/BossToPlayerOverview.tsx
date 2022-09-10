import styled from 'styled-components';
import dateFormat from 'dateformat';
import React from 'react';
import { IGuild, IPlayerDetails } from '../../interfaces/FightResponse';
import { InfoWithClassColor } from '../../features/player/InfoWithClassColor';

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
  comparePlayers: boolean;
  secondPlayer: IPlayerDetails | null;
}

function BossToPlayerOverview({
  startTime,
  endTime,
  guild,
  player,
  secondPlayer,
  comparePlayers,
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
          <InfoWithClassColor type={player.type}>
            {player.name}
          </InfoWithClassColor>
        </Item>
        <Item>
          <p> Spec: </p>
          <InfoWithClassColor type={player.type}>
            {player.specs[0]}
          </InfoWithClassColor>
        </Item>
      </>
      )}
      { comparePlayers && secondPlayer && (
      <>
        <Item>
          <p>
            compared with:
          </p>
        </Item>
        <Item>
          <p> Player: </p>
          <InfoWithClassColor type={secondPlayer.type}>
            {secondPlayer.name}
          </InfoWithClassColor>
        </Item>
        <Item>
          <p> Spec: </p>
          <InfoWithClassColor type={secondPlayer.type}>
            {secondPlayer.specs[0]}
          </InfoWithClassColor>
        </Item>
      </>
      )}
    </Container>

  );
}

export default BossToPlayerOverview;
