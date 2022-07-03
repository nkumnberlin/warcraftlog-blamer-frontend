import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { IRaidId } from '../../interfaces';
import { BossReport, GeneralData } from '../../components/reports';

const Main = styled.div`
  padding: 4rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Report = ({ singleReport, bossData }: IRaidId) => (
  <Main>
    {singleReport && (
    <GeneralData {...singleReport} />
    )}

    {bossData && (
    <BossReport bossData={bossData} />
    )}
  </Main>
);
export default Report;

export const getServerSideProps: GetServerSideProps = async (props) => {
  const { params } = props;
  const { data } = await axios.get(
    `${process.env.BACKEND_URL}?action=boss&code=${params?.report}`,
  );
  return {
    props: {
      ...data,
    },
  };
};
