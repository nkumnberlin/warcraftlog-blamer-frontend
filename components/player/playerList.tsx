import React from 'react';
import styled from 'styled-components';
import { IPlayer } from '../../interfaces';

const Player = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 0.5rem 0 0.5rem 0;
  cursor: pointer;
  width: 80%;

  :hover {
    background: #444444;
  }
`;

const PlayerInfo = styled.p`
  padding: 0 0.5rem 0 0;
  min-width: 10rem;
  max-width: 30rem;
`;

interface IPlayerList {
  player: IPlayer;
  selectPlayer: (guid: number) => void;
}

const PlayerList = ({ player, selectPlayer }: IPlayerList) => (
  <Player key={player.guid} onClick={() => selectPlayer(player.id)}>
    <PlayerInfo>{player.name}</PlayerInfo>
    <PlayerInfo>{player.type}</PlayerInfo>
    <PlayerInfo>{player.maxItemLevel}</PlayerInfo>
    <PlayerInfo>{player.specs.map((p) => p.spec)}</PlayerInfo>
  </Player>
);

export default PlayerList;
