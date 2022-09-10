import React from 'react';
import styled from 'styled-components';
import PlayerInfo from './PlayerInfo';
import { PLAYER_ROLE_ATTRIBUTES } from '../../constants/PLAYER_ROLE_ATTRIBUTES';
import { IPlayerDetails, IRoleDetails } from '../../interfaces/FightResponse';
import useCumulateEvents from '../../hooks/useCumulateEvents';
import { IEventDataPlayer, IRoleEventData } from '../../interfaces/EventDataPlayer';
import EventDataToPlayer from './EventData';

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
  setSecondPlayer: (player: IPlayerDetails) => void;
  comparePlayers: boolean
}

function PlayerList({
  roles, selectPlayer, parses, setSecondPlayer, comparePlayers,
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
                setSecondPlayer={setSecondPlayer}
                comparePlayers={comparePlayers}
                parses={parses}
                roleType={key}
              />
            ))}
          </React.Fragment>
        ))}
    </PlayerRoleContainer>
  );
}

export default PlayerList;
