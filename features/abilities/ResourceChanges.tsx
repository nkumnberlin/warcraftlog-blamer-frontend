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
import ResourceGainBody from '../../components/table/bodys/ResourceGainBody';

interface IAbilites {
  abilities: IBuffs[];
  abilitiesWithIcon: AbilitiesWithIcon[],
}

const StyledAccordionItems = styled(AccordionItem)`
  border: 0;
  background: rgba(255, 255, 255, 0.10);
`;

function ResourceChanges({
  abilities,
  abilitiesWithIcon,
}: IAbilites) {
  // const targetOfAbility = assignEnemyToId(target, enemies, allPlayers);
  let onlyResourceChanges = {} as IBuffs;
  Object.keys(abilities).forEach((abilityKey) => {
    const parsedKey = parseInt(abilityKey, 10);
    if ((abilities[parsedKey] as unknown as IAbility[])[0].type === 'resourcechange') {
      onlyResourceChanges = { ...onlyResourceChanges, [parsedKey]: abilities[parsedKey] };
    }
  });
  return (
    <>
      {Object.keys(onlyResourceChanges).length > 0 && (
        <>
          {Object.keys(onlyResourceChanges)
            .map((abilityKey) => (
              <Accordion allowToggle key={abilityKey}>
                <StyledAccordionItems>
                  <AccordionButton>
                    <AbilityToolTip
                      abilityNumber={abilityKey}
                      abilitiesWithIcon={abilitiesWithIcon}
                    />
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel>
                    <DetailsTableContainer
                      header={['Resource Gained']}
                    >
                      <ResourceGainBody
                        onlyResourceChanges={onlyResourceChanges}
                        abilityKey={abilityKey}
                      />
                    </DetailsTableContainer>
                  </AccordionPanel>
                </StyledAccordionItems>
              </Accordion>
            ))}
        </>
      )}
    </>
  );
}

export default ResourceChanges;
