import React from 'react';
import { Td, Tr } from '@chakra-ui/react';
import { IAbility, IBuffs } from '../../../interfaces/AbilityResponse';

interface ICooldownBody {
  cooldown: IBuffs[],
  abilityKey: string,
  playerClass: string
}
function CooldownBody({
  cooldown, abilityKey, playerClass,
}: ICooldownBody) {
  return (
    <>
      {(cooldown[parseInt(abilityKey, 10)] as unknown as IAbility[])
        .map(({ classResources, timestamp, hitPoints }, index) => (
          <Tr>
            <Td>{index + 1}</Td>
            <Td>
              {hitPoints}
              %
              {' '}
              / 100%
            </Td>
            <Td>
              {playerClass === 'Warrior'
                ? classResources[0]?.amount / 10 : classResources[0]?.amount}
              {' '}
              of
              {' '}
              {playerClass === 'Warrior'
                ? classResources[0]?.max / 10 : classResources[0]?.max}
            </Td>
            <Td>
              {timestamp}
              {' '}
              (ToDo)
            </Td>
            <Td>
              ToDo
            </Td>
          </Tr>
        ))}
    </>
  );
}

export default CooldownBody;
