import React from 'react';
import {
  Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel,
} from '@chakra-ui/react';
import styled from 'styled-components';
import {
  AbilitiesWithIcon, IAbility, IBuffs,
} from '../../interfaces/AbilityResponse';
import { AbilityToolTip } from '../../components/tooltip';
import DetailsTableContainer from '../../components/table/DetailsTableContainer';
import { IEnemies } from '../../interfaces/FightResponse';
import { IAllPlayers } from '../../interfaces';
import EventsBody from '../../components/table/bodys/EventsBody';

interface IAbilites {
  abilities: IBuffs[];
  abilitiesWithIcon: AbilitiesWithIcon[],
  enemies: IEnemies[],
  allPlayers: IAllPlayers
}

const StyledAccordionItems = styled(AccordionItem)`
  border: 0;
  background: rgba(255, 255, 255, 0.10);
`;

function Events({
  abilities,
  abilitiesWithIcon,
  enemies,
  allPlayers,
}: IAbilites) {
  // const targetOfAbility = assignEnemyToId(target, enemies, allPlayers);
  let onlyEvents = {} as IBuffs;
  Object.keys(abilities).forEach((abilityKey) => {
    const parsedKey = parseInt(abilityKey, 10);
    const abilityType = (abilities[parsedKey] as unknown as IAbility[])[0].type;
    if (abilityType !== 'resourcechange' && abilityType !== 'cast') {
      onlyEvents = { ...onlyEvents, [parsedKey]: abilities[parsedKey] };
    }
  });
  const deathPlaceholderImage = '18308';
  return (
    <>
      {Object.keys(onlyEvents)
        .map((abilityKey) => (
          <Accordion allowToggle key={abilityKey}>
            <StyledAccordionItems>
              <AccordionButton>
                <AbilityToolTip
                  abilityNumber={abilityKey === '0' ? deathPlaceholderImage : abilityKey}
                  abilitiesWithIcon={abilitiesWithIcon}
                />
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel>
                <DetailsTableContainer
                  header={['Event Type']}
                >
                  <EventsBody
                    onlyEvents={onlyEvents}
                    abilityKey={abilityKey}
                    enemies={enemies}
                    allPlayers={allPlayers}
                  />
                </DetailsTableContainer>
              </AccordionPanel>
            </StyledAccordionItems>
          </Accordion>
        ))}
    </>
  );
}

export default Events;
