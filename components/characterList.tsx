import React from 'react';
import styled from 'styled-components';
import useSWR from 'swr';
import { IFightDetails } from '../interfaces';

const CharacterContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 4rem 0 4rem;
`;

const CharacterInfo = styled.div`
  margin: 0.5rem 0 0.5rem 0;
  cursor: pointer;
`;

const CharacterList = ({ fight }: IFightDetails) => (
  <CharacterContainer>
    {fight.friendlyPlayers.map((player: any) => (
      <CharacterInfo key={player} onClick={() => console.log({ id: 'player', value: player })}>
        Name:
        {' '}
        {player}
      </CharacterInfo>
    ))}
  </CharacterContainer>
);

export default CharacterList;
