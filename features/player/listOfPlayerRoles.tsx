import React from 'react';
import styled from 'styled-components';
import PlayerInfo from './playerInfo';
import { PLAYER_ROLE_ATTRIBUTES } from '../../constants/PLAYER_ROLE_ATTRIBUTES';
import { IPlayerDetails, IRoleDetails } from '../../interfaces/FightResponse';
import useCumulateEvents from '../../hooks/useCumulateEvents';
import { IEventDataPlayer, IRoleEventData } from '../../interfaces/EventDataPlayer';
import EventDataToPlayer from './eventData';

const PlayerRoleContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const MetaDataContainer = styled.div`
  display: flex;
  margin-Bottom: 0.5rem;
  padding-left: 3rem;
`;

const MetaData = styled.p`
  font-weight: bold;
  min-width: 9rem;
`;

interface IPlayerTypeList {
  roles: IRoleDetails,
  parses: {dps: {'': number}, hps:{'': number}}
  selectPlayer: (player: IPlayerDetails) => void;
  selectedPlayer: number;
  eventData: IRoleEventData
}

function ListOfPlayerRoles({
  roles, selectPlayer, selectedPlayer, parses, eventData,
}: IPlayerTypeList) {
  return (
    <PlayerRoleContainer>
      {Object.keys(roles)
        .sort()
        .map((key) => (
          <React.Fragment key={key}>
            <h2 style={{ marginTop: '0.5rem' }}>{key.toUpperCase()}</h2>
            <MetaDataContainer>
              {PLAYER_ROLE_ATTRIBUTES.map((attribute) => (
                <MetaData key={attribute}>
                  {attribute}
                  :
                </MetaData>
              ))}
            </MetaDataContainer>
            {roles[key as keyof IRoleDetails].map((player) => (
              <PlayerInfo
                key={player.guid}
                player={player}
                selectPlayer={selectPlayer}
                parses={parses}
                roleType={key}
              />
            ))}
          </React.Fragment>
        ))}
    </PlayerRoleContainer>
  );
}

export default ListOfPlayerRoles;
