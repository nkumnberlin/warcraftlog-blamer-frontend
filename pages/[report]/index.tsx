import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { IRaidId } from '../../interfaces';
import { Fight } from '../../components/headers';
import { BossReport } from '../../components/reports';

const Main = styled.div`
  padding: 4rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Report = ({ singleReport, onlyBossFights }: IRaidId) =>
  // const address = `${process.env.BACKEND_URL}?action=fight&code=${params?.report}`, ;
  // const fetcher = async (url) => await axios.get(url).then((res) => res.data);
  // const { data, error } = useSWR(address, fetcher);
  (
    <Main>
      {singleReport && (
      <Fight {...singleReport} />
      )}

      {onlyBossFights && (
      <BossReport onlyBossFights={onlyBossFights} />
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
