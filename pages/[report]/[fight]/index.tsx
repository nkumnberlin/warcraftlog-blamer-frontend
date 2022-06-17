import React from 'react';
import { NextPageContext } from 'next/types';
import styled from 'styled-components';
import dateFormat from 'dateformat';
import { useRouter } from 'next/router';
import { GetBossFightsToLog } from '../../../mocks/getBossFightsToLog';

interface IFight {
  fight: {
    difficulty: number;
    name: string;
    id: number;
    kill: string;
    fightPercentage: number;
    friendlyPlayers: [number];
  };
  report: {
    endTime: number;
    startTime: number;
    guild: { name: string; id: number; faction: { name: string } };
  }
}

const Main = styled.div`
  padding: 4rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const CharacterContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 4rem 0 4rem;
`;

const CharacterInfo = styled.div`
  margin: 0.5rem 0 0.5rem 0;
  cursor: pointer;
`;

const EncounterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-bottom: 2rem;
`;

interface IUpdateQueryParam {
  id: string,
  value: number;
}

const Fight = ({ fight, report }: IFight) => {
  console.log('loggi ', fight);
  const router = useRouter();

  function UpdateQueryParam({ id, value }: IUpdateQueryParam) {
    router.query[id] = value.toString();
    router.push({
      query: { ...router.query },
    });
  }
  return (
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
      <CharacterContainer>
        {fight.friendlyPlayers.map((player) => (
          <CharacterInfo key={player} onClick={() => UpdateQueryParam({ id: 'player', value: player })}>
            Name:
            {' '}
            {player}
          </CharacterInfo>
        ))}
      </CharacterContainer>
    </Main>
  );
};

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
