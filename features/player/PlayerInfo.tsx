import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { IPlayerDetails } from '../../interfaces/FightResponse';
import { assignParseToParseColor } from '../../constants/PARSE_COLORS';
import { InfoWithClassColor } from './InfoWithClassColor';

const Player = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 0.25rem;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.2);
  
  :hover {
    background: #444444;
  }
`;

const Parse = styled.p<{parse?: string}>`
  padding: 0 0.5rem 0 0;
  min-width: 2.5rem;
  color: ${(props) => props.parse};
`;

const IssueContainer = styled.span`
  min-width: 1rem;
  max-width: 2rem;
  color: rgba(255, 0, 0, 0.60);
`;

interface IPlayerList {
  player: IPlayerDetails
  selectPlayer: (player: IPlayerDetails) => void;
  setSecondPlayer: (player: IPlayerDetails) => void;
  comparePlayers: boolean;
  parses: {dps: {'': number}, hps: {'':number}}
  roleType: string
}

function PlayerInfo({
  player, selectPlayer, parses, roleType, setSecondPlayer, comparePlayers,
}: IPlayerList) {
  const parseRaw = parses[roleType === 'healers' ? 'hps' : 'dps'];
  // @ts-ignore
  const parse = Math.trunc(parseRaw[player.name]) || '';
  return (
    <Player
      key={player.guid}
      onClick={() => {
        // eslint-disable-next-line no-param-reassign
        player.role = roleType;
        if (comparePlayers) {
          setSecondPlayer(player);
        } else {
          selectPlayer(player);
        }
      }}
    >
      <Parse parse={assignParseToParseColor(parse)}>
        {parse}
      </Parse>
      <Image
        src={`https://assets.rpglogs.com/img/warcraft/icons/${player.icon}.jpg`}
        alt={player.type}
        width="18px"
        height="18px"
      />
      <InfoWithClassColor style={{ paddingLeft: '8px' }} type={player.type}>
        {player.name}
      </InfoWithClassColor>
      <InfoWithClassColor>{player.specs.map((spec) => spec)}</InfoWithClassColor>
      <InfoWithClassColor smallElement>{player.maxItemLevel}</InfoWithClassColor>
      {player.hasIssues && <IssueContainer>&#9888;</IssueContainer>}
    </Player>
  );
}

export default PlayerInfo;
