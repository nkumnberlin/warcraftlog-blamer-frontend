import React from 'react';
import styled from 'styled-components';
import PlayerInfo from './playerInfo';
import { PLAYER_ROLE_ATTRIBUTES } from '../../constants/PLAYER_ROLE_ATTRIBUTES';
import { IPlayerDetails, IRoleDetails } from '../../interfaces/FightResponse';
import { IChoice } from '../../interfaces/Choice';
import Button from '../button/button';

const PlayerRoleContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 550px;
  
`;

const MetaDataContainer = styled.div`
  display: flex;
  margin-Bottom: 0.5rem
`;

const MetaData = styled.p`
  font-weight: bold;
  min-width: 10rem;
`;

interface IPlayerTypeList {
  roles: IRoleDetails,
  selectPlayer: (player: IPlayerDetails) => void;
  selectedPlayer: number;
  setChoice: (choice: IChoice) => void;
}

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  min-height: 2.5rem;
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
`;

function ListOfPlayerRoles({
  roles, selectPlayer, selectedPlayer, setChoice,
}: IPlayerTypeList) {
  return (
    <PlayerRoleContainer>
      {Object.keys(roles)
        .sort()
        .map((key) => (
          <React.Fragment key={key}>
            <h2>{key.toUpperCase()}</h2>
            <MetaDataContainer>
              {PLAYER_ROLE_ATTRIBUTES.map((attribute) => (
                <MetaData key={attribute}>
                  {attribute}
                  :
                </MetaData>
              ))}
            </MetaDataContainer>
            {roles[key as keyof IRoleDetails].map((player) => (
              <React.Fragment key={player.guid}>
                <PlayerInfo
                  key={player.guid}
                  player={player}
                  selectPlayer={selectPlayer}
                />
                {selectedPlayer === player.guid && (
                  <ButtonContainer>
                    {player.hasIssues && <Button text="See Gear with Issues" action={() => setChoice('issues')} />}
                    <Button text="See complete Gear" action={() => setChoice('all')} />
                  </ButtonContainer>
                )}
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
    </PlayerRoleContainer>
  );
}

export default ListOfPlayerRoles;
