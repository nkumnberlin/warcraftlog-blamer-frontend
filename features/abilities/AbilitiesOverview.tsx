import React from 'react';
import { useRouter } from 'next/router';
import useSWR, { SWRResponse } from 'swr';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel, Box, Skeleton, SkeletonCircle, SkeletonText,
} from '@chakra-ui/react';
import styled from 'styled-components';
import { IEnemies, IPlayerDetails } from '../../interfaces/FightResponse';
import { getAbilitiesToPlayer } from '../../api/rest';
import { Actions, IAllPlayers } from '../../interfaces';
import { AuraToolTip } from '../../components/tooltip';
import { AbilityResponse } from '../../interfaces/AbilityResponse';
import Cooldowns from './Cooldowns';
import ResourceChanges from './ResourceChanges';
import Events from './Events';

const StyledAccordionPanel = styled(AccordionPanel)`
  border: 0;
  background: rgba(255, 255, 255, 0.10);
`;

interface IAbilitiesUsage {
  player: IPlayerDetails;
  allPlayers: IAllPlayers;
  enemies: IEnemies[];
}

function AbilitiesOverview({
  player,
  allPlayers,
  enemies,
}: IAbilitiesUsage) {
  const { query } = useRouter();
  const action: Actions = 'FEATURE_ABILITY_ISSUES';
  const params = {
    code: query?.report || '',
    fight: query?.fight || '',
    encounterID: query.encounterID || '',
    startTime: query.startTime || '',
    endTime: query.endTime || '',
    sourceID: player.id,
    action,
  };
  const { data: abilityResponse }: SWRResponse<AbilityResponse> = useSWR(() => (player
    .id !== null ? params : null),
  getAbilitiesToPlayer, {
    refreshInterval: 0,
  });

  if (!abilityResponse?.abilitiesWithIcon) {
    return (
      <Box padding="10" boxShadow="lg" bg="black">
        <Skeleton height="20px" />
        <Skeleton height="20px" style={{ marginTop: '0.5rem' }} />
        <Skeleton height="20px" style={{ marginTop: '0.5rem' }} />
        <Skeleton height="20px" style={{ marginTop: '0.5rem' }} />
        <Skeleton height="20px" style={{ marginTop: '0.5rem' }} />
        <Skeleton height="20px" style={{ marginTop: '0.5rem' }} />
        <Skeleton height="20px" style={{ marginTop: '0.5rem' }} />
        <Skeleton height="20px" style={{ marginTop: '0.5rem' }} />
        <Skeleton height="20px" style={{ marginTop: '0.5rem' }} />
        <Skeleton height="20px" style={{ marginTop: '0.5rem' }} />
        <Skeleton height="20px" style={{ marginTop: '0.5rem' }} />
      </Box>
    );
  }
  const {
    auras,
    buffs,
    abilities,
    abilitiesWithIcon,
  } = abilityResponse;
  return (
    <div>
      <Accordion allowToggle style={{ marginTop: '1.5rem' }}>
        <AccordionItem>
          <AccordionButton>
            <p>
              Auras
            </p>
            <AccordionIcon />
          </AccordionButton>
          <StyledAccordionPanel>
            {auras && auras.map((aura) => (
              <div key={aura.ability} style={{ marginRight: '0.25rem' }}>
                <AuraToolTip
                  aura={aura}
                />
              </div>
            ))}
          </StyledAccordionPanel>
        </AccordionItem>
      </Accordion>

      <Accordion allowToggle style={{ marginTop: '1.5rem' }}>
        <AccordionItem>
          <AccordionButton>
            <p>
              Cooldowns, Pots and  more:
            </p>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <Cooldowns
              playerClass={player.type}
              buffs={buffs}
              abilitiesWithIcon={abilitiesWithIcon}
            />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      <Accordion allowToggle style={{ marginTop: '1.5rem' }}>
        <AccordionItem>
          <AccordionButton>
            <p>
              Resource Changes:
            </p>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <ResourceChanges
              abilities={abilities}
              abilitiesWithIcon={abilitiesWithIcon}
            />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      <Accordion allowToggle style={{ marginTop: '1.5rem' }}>
        <AccordionItem>
          <AccordionButton>
            <p>
              Events
            </p>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <Events
              abilities={abilities}
              abilitiesWithIcon={abilitiesWithIcon}
              enemies={enemies}
              allPlayers={allPlayers}
            />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

    </div>
  );
}

export default AbilitiesOverview;
