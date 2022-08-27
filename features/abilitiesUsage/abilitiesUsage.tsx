import React from 'react';
import { useRouter } from 'next/router';
import useSWR, { SWRResponse } from 'swr';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from '@chakra-ui/react';
import { IEnemies, IPlayer, IPlayerDetails } from '../../interfaces/FightResponse';
import { getAbilitiesToPlayer } from '../../api/rest';
import { Actions } from '../../interfaces';
import { AbilityToolTip, AuraToolTip } from '../../components/tooltip';
import {
  AbilitiesOfPlayer, Ability,
  AbilityNumber,
  AbilityResponse,
  TargetOfAbility,
} from '../../interfaces/AbilityResponse';

interface IAllPlayers {id: IPlayer}
interface ISetEnemyToID {
  target: string,
  allPlayers:IAllPlayers;
  enemies:IEnemies[]
}
function setEnemyToId({
  target, allPlayers, enemies,
}: ISetEnemyToID) {
  const targetID = parseInt(target, 10);
  const player: IPlayer = allPlayers[targetID as unknown as keyof IAllPlayers];
  if (player) {
    return `Target: ${player.name}`;
  }
  const possibleEnemy = enemies.find((enemy) => enemy.id === targetID);
  if (possibleEnemy) {
    return possibleEnemy.name;
  }
  return 'Self';
}

interface IAbilitiesUsage {
  player: IPlayerDetails;
  allPlayers: IAllPlayers;
  enemies: IEnemies[]
}

function AbilitiesUsage({ player, allPlayers, enemies }: IAbilitiesUsage) {
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
  const { data: abilities } :SWRResponse<AbilityResponse> = useSWR(() => (player
    .id !== null ? params : null),
  getAbilitiesToPlayer, {
    refreshInterval: 0,
  });

  if (!abilities?.abilitiesOfPlayer) return <>waitin</>;
  const { auras, ...rest } = abilities?.abilitiesOfPlayer;

  // display data cumulated and as a timeline
  // recieved
  return (
    <div>
      <Accordion allowToggle style={{ marginTop: '1rem' }}>
        <AccordionItem>
          <AccordionButton>
            <p>
              Auras
            </p>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            {auras && auras.map((aura) => (
              <div key={aura.ability} style={{ marginRight: '0.25rem' }}>
                <AuraToolTip
                  aura={aura}
                />
              </div>
            ))}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      {Object.keys(rest).map((type) => (
        <Accordion allowToggle key={type} style={{ marginTop: '1rem' }}>
          <AccordionItem>
            <AccordionButton>
              <p>
                {type}
              </p>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              {Object.keys(rest[type as keyof AbilitiesOfPlayer]).sort().map((abilityKey) => (
                <Accordion allowToggle key={abilityKey + type}>
                  <AccordionItem>
                    <AccordionButton>
                      <AbilityToolTip
                        abilityNumber={abilityKey}
                        abilitiesWithIcon={abilities?.abilitiesWithIcon}
                      />
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel>
                      {/* nur ressourcen, aura, taken, cast, death, ress */}
                      {/* filter out of casts double entries only show in ressorucechange */}
                      {Object.keys(rest[type as keyof AbilitiesOfPlayer][abilityKey as keyof AbilityNumber]).map((target) => (
                        <>
                          { setEnemyToId({
                            target,
                            enemies,
                            allPlayers,
                          }) }
                          {' Damage: '}
                          {/* cummulated dmg is needed likewise heal */}
                          {rest[type as keyof AbilitiesOfPlayer][abilityKey as keyof AbilityNumber][target as keyof TargetOfAbility].reduce((prev: number, curr: Ability) => prev + curr.amount, 0)}
                          <br />
                          Casts:
                          {' '}
                          {rest[type as keyof AbilitiesOfPlayer][abilityKey as keyof AbilityNumber][target as keyof TargetOfAbility].length}
                          <br />
                          {(type === 'resourcechange') && rest[type as keyof AbilitiesOfPlayer][abilityKey as keyof AbilityNumber][target as keyof TargetOfAbility].reduce((prev: number, curr: Ability) => prev + curr.resourceChange, 0)}
                          <br />
                          {(type === 'death') && (
                          <>
                            {rest[type as keyof AbilitiesOfPlayer][abilityKey as keyof AbilityNumber][target as keyof TargetOfAbility].map((event) => setEnemyToId({
                              target: event.killerID,
                              enemies,
                              allPlayers,
                            }))}
                          </>
                          )}
                          <br />
                          {(type === 'death') && rest[type as keyof AbilitiesOfPlayer][abilityKey as keyof AbilityNumber][target as keyof TargetOfAbility].reduce((prev: number, curr: Ability) => prev + curr.resourceChange, 0)}

                        </>
                      ))}
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              ))}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
}

export default AbilitiesUsage;
