import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import dateFormat from 'dateformat';
import { GetBossFightsToLog } from '../../mocks/getBossFightsToLog';

interface IRaidId {
  metaReport: {
        endTime: number;
        startTime: number;
        guild: { name: string; id: number; faction: { name: string } };
    },
  onlyBossFights: [
      {
        difficulty: number;
        name: string;
        id: number;
        kill: string;
        fightPercentage: number;
      }
    ];
}

const Main = styled.div`
  padding: 4rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Item = styled.div<{isListItem?: boolean}>`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  cursor: pointer;
  border-bottom: ${(props) => (props.isListItem ? '1px solid rgba(255, 255, 255, 0.2)' : '')};
`;

const Reports = styled.div`
  margin-top: 2rem;
`;

const ListItem = styled.p`
  min-width: 10rem;
  max-width: 30rem;
`;


const Report = ({ metaReport, onlyBossFights }: IRaidId) => {
  const router = useRouter();
  const { raidId } = router.query;

  return (
    <Main>
      <Item>
        <p>
          From:
          {' '}
          {dateFormat(metaReport.startTime, 'mmmm dS, yyyy, h:MM TT')}
        </p>
        <p>
          Till:
          {dateFormat(metaReport.endTime, 'mmmm dS, yyyy, h:MM TT')}
        </p>
        <p>
          Faction:
          {metaReport.guild.faction.name}
        </p>
        <p>
          Guild:
          {metaReport.guild.name}
        </p>
      </Item>
      <Reports>
        {onlyBossFights.map((fight) => (
          <Item
            isListItem
            key={fight.id}
            onClick={() => router.push({
              pathname: `${router.asPath}/${fight.id}`,
            })}
          >
            <ListItem>{fight.name}</ListItem>
            <ListItem>
              {fight.kill ? 'Kill' : `Try; HP left: ${fight.fightPercentage}%`}
            </ListItem>
            <ListItem>
              Start of Fight:
              {dateFormat(metaReport.startTime, 'mmmm dS, yyyy, h:MM TT')}
            </ListItem>
            <ListItem>
              End of Fight:
              {dateFormat(metaReport.startTime, 'mmmm dS, yyyy, h:MM TT')}
            </ListItem>
          </Item>
        ))}
      </Reports>
    </Main>
  );
};

export default Report;

Report.getInitialProps = async () => {
  try {
    // const res = await axios.get(`${process.env.BACKEND_URL}`);
    // const data = res.data;
    const metaReport = GetBossFightsToLog.data.reportData.report;
    const onlyBossFights = GetBossFightsToLog.data.reportData.report.fights.filter(
      (fight) => fight.difficulty !== null,
    );
    return { metaReport, onlyBossFights };
  } catch (error) {
    return { error };
  }
};
