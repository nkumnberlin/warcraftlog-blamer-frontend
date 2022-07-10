import React from 'react';
import styled from 'styled-components';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { useRouter } from 'next/router';
import {
  IPlayerDetails, ISingleReport,
} from '../../../interfaces';
import NavBar from '../../../components/navbar';
import LogMetaData from '../../../components/navbar/logMetaData';
import FightMetaData from '../../../components/navbar/fightMetaData';
import FeatureFilter from '../../../components/features/featureFilter';
import PlayerTypeList from '../../../components/player/playerTypeList';

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

interface IDisplayFight {
  singleReport: ISingleReport
  playerDetails: IPlayerDetails
}

const Fight = ({ singleReport, playerDetails }: IDisplayFight) => {
  const router = useRouter();
  const selectPlayer = (id: number) => {
    router.query.playerID = id.toString();
    router.push(router);
  };

  return (
    <Main>
      <NavBar>
        <LogMetaData {...singleReport} />
        {singleReport.fights
          && singleReport.fights.map((fight) => <FightMetaData key={fight.id} {...fight} />)}
      </NavBar>
      <Content>
        <PlayerTypeList playerDetails={playerDetails} selectPlayer={selectPlayer} />
        <FeatureFilter />
      </Content>
    </Main>
  );
};

export default Fight;

export const getServerSideProps: GetServerSideProps = async (props) => {
  const { query } = props;
  console.log('process: ', `${process.env.BACKEND_URL}?action=fight&code=${query?.report}&fight=${query?.fight}&encounterID=${query?.encounterID}`);
  const { data } = await axios.get(
    `${process.env.BACKEND_URL}?action=fight&code=${query?.report}&fight=${query?.fight}&encounterID=${query?.encounterID}`,
  );
  const { singleReport, playerDetails } = data;
  return {
    props: {
      singleReport,
      playerDetails,
    },
  };
};
