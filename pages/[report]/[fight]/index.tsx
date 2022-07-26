import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { Actions } from '../../../interfaces';
import ListOfPlayerRoles from '../../../components/player/listOfPlayerRoles';
import { IFightResponse, IPlayerDetails } from '../../../interfaces/FightResponse';
import { fetchFightData } from './fetchDataToFight';
import { FEATURE_IDS } from '../../../constants/FEATURE_IDS';
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
  console.log('process: ', `${process.env.BACKEND_URL}?action=${action}&code=${query?.report}&fight=${query?.fight}&encounterID=${query?.encounterID}&startTime=${query?.startTime}&endTime=${query?.endTime}`);
  const { data } = await axios.get(
    `${process.env.BACKEND_URL}?action=${action}&code=${query?.report}&fight=${query?.fight}&encounterID=${query?.encounterID}&startTime=${query?.startTime}&endTime=${query?.endTime}`,
  );
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
  const [player, setSelectedPlayer] = useState<IPlayerDetails | null>(null);
  const [choice, setChoice] = useState<IChoice>(null);
  const router = useRouter();
  const { query } = router;
  const action:Actions = 'FEATURE_GEAR_ISSUES';
  const dataQuery = `?action=${action}&code=${query?.report}&fight=${query?.fight}&encounterID=${query?.encounterID}&startTime=${query?.startTime}&endTime=${query?.endTime}`;

  console.log(choice);
  useEffect(() => {
    if (!player) return;
    const feature = 'gearIssues' as FEATURE_IDS;
    const playerContainer = document.getElementById(feature);

    if (playerContainer === null) return;
    playerContainer.scrollIntoView({
      behavior: 'smooth',
    });
  }, [player]);

  useEffect(() => {
    fetchFightData({ setFightData });
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
              roles={fightData.player}
              selectPlayer={setSelectedPlayer}
              selectedPlayer={player?.guid || 0}
              setChoice={setChoice}
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
