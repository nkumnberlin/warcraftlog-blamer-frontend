import React from 'react';
import styled from 'styled-components';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { IFight } from '../../../interfaces';

const Main = styled.div`
  padding: 4rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const EncounterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-bottom: 2rem;
`;

const Fight = ({ fight, report }: IFight) => (
  <Main>
    <EncounterContainer>
      <h2> empty spacement</h2>
      {/* <p> */}
      {/*  Boss: */}
      {/*  {fight.name} */}
      {/* </p> */}
      {/* <p> */}
      {/*  From: */}
      {/*  {' '} */}
      {/*  {dateFormat(report.startTime, 'mmmm dS, yyyy, h:MM TT')} */}
      {/* </p> */}
      {/* <p> */}
      {/*  Till: */}
      {/*  {dateFormat(report.endTime, 'mmmm dS, yyyy, h:MM TT')} */}
      {/* </p> */}
      {/* <p> */}
      {/*  Faction: */}
      {/*  {report.guild.faction.name} */}
      {/* </p> */}
      {/* <p> */}
      {/*  Guild: */}
      {/*  {report.guild.name} */}
      {/* </p> */}
    </EncounterContainer>

  </Main>
);

export default Fight;

export const getServerSideProps: GetServerSideProps = async (props) => {
  const { query } = props;
  console.log('process: ', `${process.env.BACKEND_URL}?action=fight&code=${query?.report}&fight=${query?.fight}&encounterID=${query?.encounterID}`);
  const { data } = await axios.get(
    `${process.env.BACKEND_URL}?action=fight&code=${query?.report}&fight=${query?.fight}&encounterID=${query?.encounterID}`,
  );
  return {
    props: {
      ...data,
    },
  };
};
