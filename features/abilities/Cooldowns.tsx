import React from 'react';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from '@chakra-ui/react';
import styled from 'styled-components';
import { AbilityToolTip } from '../../components/tooltip';
import { AbilitiesWithIcon, IBuffs } from '../../interfaces/AbilityResponse';
import DetailsTableContainer from '../../components/table/DetailsTableContainer';
import CooldownBody from '../../components/table/bodys/CooldownBody';

const StyledAccordionItems = styled(AccordionItem)`
  border: 0;
  background: rgba(255, 255, 255, 0.10);
`;

interface ICooldowns {
  buffs: IBuffs[],
  abilitiesWithIcon: AbilitiesWithIcon[],
  playerClass: string
}

function Cooldowns({
  buffs,
  abilitiesWithIcon,
  playerClass,
}: ICooldowns) {
  return (
    <>
      {Object.keys(buffs)
        .map((cooldowns) => (
          <Accordion allowToggle key={cooldowns}>
            <StyledAccordionItems>
              <AccordionButton>
                <AbilityToolTip
                  abilityNumber={cooldowns}
                  abilitiesWithIcon={abilitiesWithIcon}
                />
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel>
                <DetailsTableContainer
                  header={['#', 'HP', 'Mana / Energy / Rage / Runes', 'Timestamp', 'Boss HP']}
                >
                  <CooldownBody
                    cooldown={buffs}
                    playerClass={playerClass}
                    abilityKey={cooldowns}
                  />
                </DetailsTableContainer>
              </AccordionPanel>
            </StyledAccordionItems>
          </Accordion>

        ))}
    </>
  );
}

export default Cooldowns;
