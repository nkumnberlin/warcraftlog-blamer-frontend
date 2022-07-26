import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { IBossData, ISingleReport, Actions } from '../../interfaces';
import NavBar from '../../components/navbar';
import LogMetaData from '../../components/navbar/logMetaData';
import BossTryList from '../../components/reports/bossTryList';
import FeatureBar from '../../components/featureBar/featureBar';

export interface IRaidId {
  singleReport: ISingleReport,
  bossData: [IBossData]
}

const Main = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding:2rem;
  @media(max-width: 1200px){
    flex-direction: column;
  }
`;

const BossTryContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin-right: 2rem;

  @media(max-width: 1200px){
    width: 100%;
    margin-right: 0;
  }
`;

const Report = ({ singleReport, bossData }: IRaidId) => (
  <Main>
    <NavBar>
      {singleReport && (
      <LogMetaData {...singleReport} />
      )}
    </NavBar>
    <ContentContainer>
      <BossTryContainer>
        {bossData && (
        <BossTryList bossData={bossData} />
        )}
      </BossTryContainer>
      <FeatureBar />
    </ContentContainer>
  </Main>
);
export default Report;

export const getServerSideProps: GetServerSideProps = async (props) => {
  const { params } = props;
  const action:Actions = 'BOSS';
  console.log(`${process.env.BACKEND_URL}?action=${action}&code=${params?.report}\`,`);
  const { data } = await axios.get(
    `${process.env.BACKEND_URL}?action=${action}&code=${params?.report}`,
  );
  return {
    props: {
      ...data,
    },
  };
};
