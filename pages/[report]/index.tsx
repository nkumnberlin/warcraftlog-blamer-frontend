import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { IBossData, ISingleReport, Actions } from '../../interfaces';
import NavBar from '../../components/navbar';
import LogMetaData from '../../components/navbar/logMetaData';
import BossTryList from '../../components/reports/bossTryList';

export interface IRaidId {
  singleReport: ISingleReport,
  bossData: [IBossData]
}

const Main = styled.div`
  display: flex;
  flex-direction: column;
`;

const Report = ({ singleReport, bossData }: IRaidId) => (
  <Main>
    <NavBar>
      {singleReport && (
      <LogMetaData {...singleReport} />
      )}
    </NavBar>

    {bossData && (
    <BossTryList bossData={bossData} />
    )}
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
