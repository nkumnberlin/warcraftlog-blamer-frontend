import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { IPlayerDetails } from '../../interfaces/FightResponse';
import CLASS_COLORS from '../../constants/CLASS_COLORS';
import { assignParseToParseColor } from '../../constants/PARSE_COLORS';

const Player = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 0.5rem;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.2);
  
  :hover {
    background: #444444;
  }
`;

const Info = styled.p<{type?: string, smallElement?: boolean}>`
  padding: 0 0.5rem 0 0;
  min-width: ${(props) => (props.smallElement ? '2.5rem' : '10rem')};
  max-width: 15rem;
  color: ${(props) => props.type};
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
  parses: {dps: {'key': number}, hps: {'key':number}}
  roleType: string
}

function PlayerInfo({
  player, selectPlayer, parses, roleType,
}: IPlayerList) {
  const parseRaw = parses[roleType === 'healers' ? 'hps' : 'dps'];
  // @ts-ignore
  const parse = Math.trunc(parseRaw[player.name]) || '';
  return (
    <Player key={player.guid} onClick={() => selectPlayer(player)}>
      <Parse parse={assignParseToParseColor(parse)}>
        {parse}
      </Parse>
      <Image
        src={`https://assets.rpglogs.com/img/warcraft/icons/${player.icon}.jpg`}
        alt={player.type}
        width="18px"
        height="18px"
      />
      <Info style={{ paddingLeft: '8px' }} type={CLASS_COLORS[player.type.toLowerCase() as keyof typeof CLASS_COLORS]}>
        {player.name}
      </Info>
      <Info>{player.specs.map((spec) => spec)}</Info>
      <Info smallElement>{player.maxItemLevel}</Info>
      {player.hasIssues && <IssueContainer>&#9888;</IssueContainer>}
    </Player>
  );
}

export default PlayerInfo;
