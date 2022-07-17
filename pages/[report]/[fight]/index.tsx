import React, { useEffect } from 'react';
import styled from 'styled-components';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Simulate } from 'react-dom/test-utils';
import {
  Actions,
  IPlayerDetails, ISingleReport,
} from '../../../interfaces';
import NavBar from '../../../components/navbar';
import LogMetaData from '../../../components/navbar/logMetaData';
import FightMetaData from '../../../components/navbar/fightMetaData';
import FeatureFilter from '../../../components/features/featureFilter';
import PlayerTypeList from '../../../components/player/playerTypeList';
import { IFightResponse } from '../../../interfaces/FightResponse';

const Main = styled.div`
  flex: 1;
`;

const Content = styled.div`
  margin-top: 5rem;
  display: flex;
  flex-direction: row;
  padding: 0 5rem 0  5rem;

  @media(max-width: 1200px){
    flex-direction: column;
  }
`;

const PlayerDetail = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
`;

const Fight = ({ singleReport, player }: IFightResponse) => {
  const router = useRouter();
  const selectPlayer = (id: number) => {
    router.query.playerID = id.toString();
    router.push(router);
  };

  useEffect(() => {
    if (!router.query.playerID) return;
    const playerContainer = document.getElementById('playerDetails');
    if (playerContainer === null) return;
    playerContainer.scrollIntoView({
      behavior: 'smooth',
    });
  }, [router.query.playerID]);

  return (
    <Main>
      <NavBar>
        <LogMetaData {...singleReport} />
        {singleReport.fights
          && singleReport.fights.map((fight) => <FightMetaData key={fight.id} {...fight} />)}
      </NavBar>
      <Content>
        <PlayerTypeList role={player.gear} selectPlayer={selectPlayer} />
        <FeatureFilter />
      </Content>
      {router.query?.playerID && (
        <PlayerDetail id="playerDetails">
          h2
        </PlayerDetail>
      )}
    </Main>
  );
};

export default Fight;

export const getServerSideProps: GetServerSideProps = async (props) => {
  const { query } = props;
  const action: Actions = 'FIGHT';
  console.log('process: ', `${process.env.BACKEND_URL}?action=fight&code=${query?.report}&fight=${query?.fight}&encounterID=${query?.encounterID}`);
  const { data } = await axios.get(
    `${process.env.BACKEND_URL}?action=${action}&code=${query?.report}&fight=${query?.fight}&encounterID=${query?.encounterID}`,
  );
  const { singleReport, player, guild } :IFightResponse = data;
  return {
    props: {
      singleReport,
      player,
      guild,
    },
  };
};
