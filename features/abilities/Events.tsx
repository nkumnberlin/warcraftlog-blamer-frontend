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
import { IEnemies, IPlayerDetails } from '../../interfaces/FightResponse';
import { IAllPlayers } from '../../interfaces';
import EventsBody from '../../components/table/bodys/EventsBody';

interface IAbilites {
  abilities: IBuffs[];
  abilitiesWithIcon: AbilitiesWithIcon[],
  enemies: IEnemies[],
  allPlayers: IAllPlayers,
  player: IPlayerDetails
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
  player,
}: IAbilites) {
  let onlyEvents = {} as IBuffs;
  Object.keys(abilities).forEach((abilityKey) => {
    const parsedKey = parseInt(abilityKey, 10);
    const abilityType = (abilities[parsedKey] as unknown as IAbility[])[0].type;
    if (abilityType !== 'resourcechange') {
      if ((abilities[parsedKey][0] as unknown as IAbility).sourceID === player.id
        || (abilities[parsedKey][0] as unknown as IAbility).sourceID === -1) {
        onlyEvents = { ...onlyEvents, [parsedKey]: abilities[parsedKey] };
      }
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
                  header={['Casts', 'HP', 'Timestamp', 'Boss HP']}
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
