import React, { Dispatch, SetStateAction } from 'react';
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
  setChoice: Dispatch<SetStateAction<IChoice>>;
}

const Accordion = styled.div`
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
                  <Accordion>
                    {player.hasIssues && <Button text="See Gear with Issues" action={() => setChoice('issues')} />}
                    <Button text="See complete Gear" action={() => setChoice('all')} />
                    {/* <button type="button" onClick={() => setChoice('issues')}> */}
                    {/*   See Gear with issues */}
                    {/* </button> */}
                    {/* <button type="button" onClick={() => setChoice('all')}> */}
                    {/*   See all Gear */}
                    {/* </button> */}
                  </Accordion>
                )}
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
    </PlayerRoleContainer>
  );
}

export default ListOfPlayerRoles;
