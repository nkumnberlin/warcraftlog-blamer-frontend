import React from 'react';
import styled from 'styled-components';
import PlayerList from './playerList';
import { PlayerTypeListAttributes } from '../../constants/PlayerTypeListAttributes';
import { IRoleDetails } from '../../interfaces/FightResponse';

const PlayerTypeContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;

  @media(max-width: 1200px){
    width: 100%;
  }
`;

const MetaDataContainer = styled.div`
  display: flex;
  margin-Bottom: 0.5rem
`;

const MetaData = styled.p`
  font-weight: bold;
  min-width: 10rem;
  max-width: 30rem;
`;

interface IPlayerTypeList {
  role: IRoleDetails,
  selectPlayer: (guid: number) => void;
}

const PlayerTypeList = ({ role, selectPlayer }: IPlayerTypeList) => (
  <PlayerTypeContainer>
    {Object.keys(role)
      .map((key) => (
        <React.Fragment key={key}>
          <h2>{key.toUpperCase()}</h2>
          <MetaDataContainer>
            {PlayerTypeListAttributes.map((attribute) => (
              <MetaData key={attribute}>
                {attribute}
                :
              </MetaData>
            ))}
          </MetaDataContainer>
          {role[key as keyof IRoleDetails].map(({ player }) => (
            <PlayerList key={player.guid} player={player} selectPlayer={selectPlayer} />
          ))}
        </React.Fragment>
      ))}
  </PlayerTypeContainer>
);

export default PlayerTypeList;
