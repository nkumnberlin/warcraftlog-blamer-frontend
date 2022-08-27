import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { Actions } from '../../../interfaces';
import { IFightResponse, IPlayer, IPlayerDetails } from '../../../interfaces/FightResponse';
import {
  fetchEnemiesToFight,
  fetchFightData,
  fetchFightParseData,
  fetchStaticFightData,
} from '../../../api/rest';
import GearIssues from '../../../features/gearIssues';
import { IChoice } from '../../../interfaces/Choice';
import { PARSE_TYPES } from '../../../constants/PARSETYPES';
import AbilitiesUsage from '../../../features/abilitiesUsage';
import PlayerDrawer from '../../../components/drawer';
import NavBar from '../../../components/navbar';
import BossToPlayerOverview from '../../../components/navbar/BossToPlayerOverview';
import EventDataToPlayer from '../../../features/player/eventData';
import useCumulateEvents from '../../../hooks/useCumulateEvents';
import { IEventDataPlayer } from '../../../interfaces/EventDataPlayer';

const Main = styled.div`
  flex: 1;
  padding:0 0 5rem;
  @media (max-width: 960px) {
    padding: 2rem;
  }
`;

const ContentContainer = styled.div<{hasPlayerSelected:boolean}>`
  display: flex;
  flex-direction: row;
  min-height: 80vh;
  max-width: 1440px;
  margin: 0 auto;
  padding: 1rem;
  border:  1px solid rgba(255, 255, 255, 0.2);
  align-items: ${(props) => (props.hasPlayerSelected ? '' : 'center')};
  @media (max-width: 1200px) {
    flex-direction: column;
  }
`;

const Content = styled.div`
  width: 100%;
`;

export const getServerSideProps: GetServerSideProps = async (props) => {
  const { query } = props;

  const enemiesAction: Actions = 'ENEMIES';
  const { data: enemies } = await fetchEnemiesToFight({
    action: enemiesAction,
    code: query?.report || '',
  });
  const action: Actions = 'FIGHT';
  const { data } = await fetchStaticFightData({
    action,
    code: query?.report || '',
    fight: query?.fight || '',
    encounterID: query.encounterID || '',
    startTime: query.startTime || '',
    endTime: query.endTime || '',
  });
  return {
    props: {
      ...data,
      enemies,
    },
  };
};

const Fight = (fightResponse: IFightResponse) => {
  const {
    enemies,
    damageDone,
    healingDone,
    deathEvents,
    guild,
  } = fightResponse;
  const eventData = {
    damageDone,
    healingDone,
    deathEvents,
  };
  const [fightData, setFightData] = useState(fightResponse);
  const [parseData, setParseData] = useState({
    dps: { '': 0 },
    hps: { '': 0 },
  });
  const [player, setSelectedPlayer] = useState<IPlayerDetails | null>(null);
  const [choice, setChoice] = useState<IChoice>(null);
  const { query } = useRouter();

  const setPlayer = (chosenPlayer: IPlayerDetails) => {
    if (player === chosenPlayer) {
      return setSelectedPlayer(null);
    }
    return setSelectedPlayer(chosenPlayer);
  };

  async function fetchFightGearData() {
    const action: Actions = 'FEATURE_GEAR_ISSUES';
    const params = {
      action,
      code: query?.report || '',
      fight: query?.fight || '',
      encounterID: query.encounterID || '',
      startTime: query.startTime || '',
      endTime: query.endTime || '',
    };
    fetchFightData({
      setFightData,
      params,
    });
  }

  const allPlayer = useCallback(() => {
    const players = [
      ...fightData.player.dps,
      ...fightData.player.healers,
      ...fightData.player.tanks,
    ];
    return players.reduce((prev, curr) => ({
      ...prev,
      [curr.id]: curr,
    }), {} as { id: IPlayer });
  }, [fightData.player]);

  async function fetchParse(parseType: PARSE_TYPES) {
    fetchFightParseData({
      action: 'LIST_PARSE_TO_FIGHT',
      code: query?.report || '',
      encounterID: query.encounterID || '',
      parseType,
    })
      .then(({ data }) => setParseData((prevState) => ({
        ...prevState,
        ...data,
      })));
  }

  useEffect(() => {
    if (choice !== null && window.innerWidth > 1400) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, [choice]);
  useEffect(() => setChoice(null), [player]);
  useEffect(() => {
    fetchFightGearData();
    fetchParse('hps');
    fetchParse('dps');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const cumulatedDmg = useCumulateEvents(damageDone)();
  // const cumulatedHeal = useCumulateEvents(healingDone)();

  // const events: IEventDataPlayer = {
  //   cumulatedDmg,
  //   cumulatedHeal,
  //   ...eventData,
  // };
  return (
    <>
      <Script
        id="header"
      >
        {'const whTooltips = {colorLinks: true, iconizeLinks: true, renameLinks: true}'}
      </Script>
      <Script
        id="headerscript"
        src="https://wow.zamimg.com/widgets/power.js"
        strategy="lazyOnload"
      />
      <Main>
        <NavBar>
          {fightResponse && (
            <BossToPlayerOverview
              guild={guild}
              startTime={parseInt(query?.startTime?.toString() || '0', 10)}
              endTime={parseInt(query?.endTime?.toString() || '0', 10)}
              player={player}
            />
          )}
        </NavBar>

        {fightData?.player
          && (
            <ContentContainer hasPlayerSelected={!!player?.guid}>
              <PlayerDrawer
                parses={parseData}
                roles={fightData.player}
                selectPlayer={setPlayer}
                selectedPlayer={player?.guid || 0}
                eventData={eventData}
              />

                {player && (
                <Content>
                  <GearIssues
                    player={player}
                  />
                  <AbilitiesUsage
                    player={player}
                    allPlayers={allPlayer()}
                    enemies={enemies}
                  />
                </Content>
                )}
            </ContentContainer>
          )}
      </Main>
    </>

  );
};

export default Fight;
