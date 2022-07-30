import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { Actions } from '../../../interfaces';
import ListOfPlayerRoles from '../../../components/player/listOfPlayerRoles';
import { IFightResponse, IPlayerDetails } from '../../../interfaces/FightResponse';
import { fetchFightData, fetchStaticFightData, fetchFightParseData } from '../../../api/rest';
import GearIssues from '../../../features/gearIssues';
import { IChoice } from '../../../interfaces/Choice';

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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const fetchFightGearData = async () => {
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
  };

  const fetchParseDPSData = async () => {
    const { data } = await fetchFightParseData({
      action: 'LIST_PARSE_TO_FIGHT',
      code: query?.report || '',
      encounterID: query.encounterID || '',
      parseType: 'dps',
    });
    setParseData((prevState) => ({
      ...prevState,
      dps: data.dps,
    }));
  };

  const fetchParseHPSData = async () => {
    const { data } = await fetchFightParseData({
      action: 'LIST_PARSE_TO_FIGHT',
      code: query?.report || '',
      encounterID: query.encounterID || '',
      parseType: 'hps',
    });
    setParseData((prevState) => ({
      ...prevState,
      hps: data.hps,
    }));
  };

  useEffect(() => setChoice(null), [player]);

  useEffect(() => {
    fetchFightGearData();
    fetchParseHPSData();
    fetchParseDPSData();
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
                <GearIssues
                  player={player}
                  choice={choice}
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
