import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { Actions } from '../../../interfaces';
import ListOfPlayerRoles from '../../../features/player/listOfPlayerRoles';
import { IFightResponse, IPlayerDetails, IRoleDetails } from '../../../interfaces/FightResponse';
import { fetchFightData, fetchStaticFightData, fetchFightParseData } from '../../../api/rest';
import GearIssues from '../../../features/gearIssues';
import { IChoice } from '../../../interfaces/Choice';
import { PARSE_TYPES } from '../../../constants/PARSETYPES';
import AbilitiesUsage from '../../../features/abilitiesUsage';

const Main = styled.div`
  flex: 1;
  padding: 5rem;
  @media (max-width: 960px) {
    padding: 2rem;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: 1200px) {
    flex-direction: column;
  }
`;

const Content = styled.div`
  margin: 0 1rem 1rem 0;
`;

export const getServerSideProps: GetServerSideProps = async (props) => {
  const { query } = props;
  const action: Actions = 'FIGHT';
  const { data } = await fetchStaticFightData({
    action,
    code: query?.report || '',
    fight: query?.fight || '',
    encounterID: query.encounterID || '',
    startTime: query.startTime || '',
    endTime: query.endTime || '',
  });

  const {
    player,
    guild,
  }: IFightResponse = data;
  return {
    props: {
      player,
      guild,
    },
  };
};

const Fight = (fightResponse: IFightResponse) => {
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

  const setUserChoice = (userChoice: IChoice) => {
    setChoice(userChoice);
  };

  async function fetchFightGearData() {
    const action:Actions = 'FEATURE_GEAR_ISSUES';
    const params = {
      action,
      code: query?.report || '',
      fight: query?.fight || '',
      encounterID: query.encounterID || '',
      startTime: query.startTime || '',
      endTime: query.endTime || '',
    };
    fetchFightData({ setFightData, params });
  }

  const allPlayer = useCallback(() => ({
    ...fightData.player.dps,
    ...fightData.player.healers,
    ...fightData.player.tanks,
  }), [fightData.player]);

  async function fetchParse(parseType:PARSE_TYPES) {
    fetchFightParseData({
      action: 'LIST_PARSE_TO_FIGHT',
      code: query?.report || '',
      encounterID: query.encounterID || '',
      parseType,
    }).then(({ data }) => setParseData((prevState) => ({
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

  return (
    <>
      <Script id="header">{'const whTooltips = {colorLinks: true, iconizeLinks: true, renameLinks: true}'}</Script>
      <Script id="headerscript" src="https://wow.zamimg.com/widgets/power.js" strategy="lazyOnload" />
      <Main>
        {fightData?.player
        && (
        <ContentContainer>
          <Content>
            <ListOfPlayerRoles
              parses={parseData}
              roles={fightData.player}
              selectPlayer={setPlayer}
              selectedPlayer={player?.guid || 0}
              setChoice={setUserChoice}
            />
          </Content>
            {player && choice && (
              <Content>
                {choice === 'issues'
                 && (
                 <GearIssues
                   player={player}
                   choice={choice}
                 />
                 )}
                {choice === 'abilities'
                  && (
                  <AbilitiesUsage
                    player={player}
                    allPlayer={allPlayer()}
                  />
                  )}
              </Content>
            )}
        </ContentContainer>
        )}
      </Main>
    </>

  );
};

export default Fight;
