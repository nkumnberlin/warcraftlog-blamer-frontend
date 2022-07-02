import React from 'react';
import { NextPageContext } from 'next/types';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import dateFormat from 'dateformat';
import { GetBossFightsToLog } from '../../../mocks/getBossFightsToLog';
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
      <p>
        Boss:
        {fight.name}
      </p>
      <p>
        From:
        {' '}
        {dateFormat(report.startTime, 'mmmm dS, yyyy, h:MM TT')}
      </p>
      <p>
        Till:
        {dateFormat(report.endTime, 'mmmm dS, yyyy, h:MM TT')}
      </p>
      <p>
        Faction:
        {report.guild.faction.name}
      </p>
      <p>
        Guild:
        {report.guild.name}
      </p>
    </EncounterContainer>

  </Main>
);

export default Fight;
Fight.getInitialProps = async ({ query }: NextPageContext) => {
  const { fight, report } = query;
  try {
    console.log(report);
    // const res = await swr.get(`${process.env.BACKEND_URL}`);
    // const data = res.data;
    return {
      report: GetBossFightsToLog.data.reportData.report,
      fight: GetBossFightsToLog.data.reportData.report
        .fights
        .find((curFight) => curFight.id.toString() === fight),
    };
  } catch (error) {
    return { error };
  }
};
