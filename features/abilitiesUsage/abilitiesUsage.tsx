import React from 'react';
import { useRouter } from 'next/router';
import useSWR, { SWRResponse } from 'swr';
import { IPlayer, IPlayerDetails } from '../../interfaces/FightResponse';
import { getAbilitiesToPlayer } from '../../api/rest';
import { Actions } from '../../interfaces';
import { AbilityToolTip, AuraToolTip } from '../../components/tooltip';
import {
  AbilitiesOfPlayer,
  AbilityResponse,
  TypesOfAbilities,
} from '../../interfaces/AbilityResponse';

interface IAbilitiesUsage {
  player: IPlayerDetails;
  allPlayer: IPlayer[]
}

function AbilitiesUsage({ player, allPlayer }: IAbilitiesUsage) {
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

  console.log('alle', allPlayer);
  return (
    <>
      {auras.map((aura) => (
        <AuraToolTip
          aura={aura}
        />
      ))}
      {Object.keys(rest).map((type) => (
        <>
          <p>
            {type}
          </p>
          {Object.keys(rest[type as keyof AbilitiesOfPlayer]).map((abilityKey) => (
            <div style={{ marginTop: '0.5rem' }}>
              <div>
                <AbilityToolTip
                  ability={
                  rest[type as keyof AbilitiesOfPlayer][abilityKey as keyof TypesOfAbilities][0]
                }
                  abilitiesWithIcon={abilities?.abilitiesWithIcon}
                />
              </div>
              {rest[type as keyof AbilitiesOfPlayer][abilityKey as keyof TypesOfAbilities]
                .map((ability) => (
                  <>
                    <AbilityToolTip
                      ability={ability}
                      abilitiesWithIcon={abilities?.abilitiesWithIcon}
                    />
                    <p>
                      target:
                      {ability.targetID}
                      source:
                      {ability.sourceID}
                      Curr Hp:
                      {ability.hitPoints}
                      Max Hp:
                      {ability.maxHitPoints}
                      Max Hp:
                      {ability.maxHitPoints}
                      TimeStamp:
                      {ability.timestamp}
                      {ability?.classResources?.length > 0
                      && (
                      <>
                        Class Ress Type:
                        {ability.classResources[0].type}
                        Class Ress Amount:
                        {ability.classResources[0].amount}
                        Class Ress Max:
                        {ability.classResources[0].max}
                      </>
                      )}
                    </p>
                  </>
                ))}

            </div>
          ))}
        </>
      ))}
    </>
  );
}

export default AbilitiesUsage;
