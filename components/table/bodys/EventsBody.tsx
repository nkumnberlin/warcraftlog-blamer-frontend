import React from 'react';
import { Td, Tr } from '@chakra-ui/react';
import { IBuffs } from '../../../interfaces/AbilityResponse';
import { IEnemies } from '../../../interfaces/FightResponse';
import { IAllPlayers } from '../../../interfaces';
import { findTargetName } from '../../../utils/enemies';

interface IEventsBody {
  onlyEvents: IBuffs,
  abilityKey: string,
  enemies: IEnemies[],
  allPlayers: IAllPlayers
}
function EventsBody({
  onlyEvents, abilityKey, enemies, allPlayers,
}:IEventsBody) {
  const abilityKeyInt = parseInt(abilityKey, 10);
  return (
    <>
      {Object.keys(onlyEvents[abilityKeyInt]).map((event, index) => (
        <Tr>
          <Td>{index + 1}</Td>
          {
            onlyEvents[abilityKeyInt][parseInt(event, 10)].type === 'death'
          && (
          <Td>
            Killed by:
            {' '}
            {findTargetName({
              target: onlyEvents[abilityKeyInt][parseInt(event, 10)].killerID,
              enemies,
              allPlayers,
            })}
          </Td>
          )
          }
        </Tr>
      ))}
    </>
  );
}

export default EventsBody;
