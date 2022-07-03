import React from 'react';
import dateFormat from 'dateformat';
import styled from 'styled-components';
import { NextRouter, useRouter } from 'next/router';
import { IBossData, IOnlyBossFight } from '../../interfaces';

const Item = styled.div<{ isListItem?: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  cursor: pointer;
  width: 80%;
  margin: 0 auto;
  border-bottom: ${(props) => (props.isListItem ? '1px solid rgba(255, 255, 255, 0.2)' : '')};

  :hover {
    background: #444444;
  }
`;

const Reports = styled.div`
  margin-top: 2rem;
`;

const ListItem = styled.p`
  min-width: 10rem;
  max-width: 30rem;
`;

interface IFight {
  fight: IOnlyBossFight,
  report: string | string[] | undefined,
  router: NextRouter
}

const Fight = ({ fight, router, report }:IFight) => (
  <Item
    isListItem
    key={fight.id}
    onClick={() => router.push('/[report]/[fight]', `${report}/${fight.id}?encounterID=${fight.encounterID}`)}
  >
    <ListItem>{fight.name}</ListItem>
    <ListItem>
      {fight.kill ? 'Kill' : `HP left: ${fight.fightPercentage}%`}
    </ListItem>
    <ListItem>
      Time of Fight:
      {' '}
      {dateFormat(fight.startTime + fight.endTime, 'HH:MM:ss')}
    </ListItem>
  </Item>
);

interface IBossInfo {
  bossInfo: IOnlyBossFight,
  kill: boolean
}

const BossInfo = ({ bossInfo, kill }: IBossInfo) => (
  <Item isListItem key={bossInfo.id}>
    <ListItem>{bossInfo.name}</ListItem>
    <ListItem>
      {kill ? 'Killed' : 'Alive'}
    </ListItem>
  </Item>
);

export interface IBossReport {
  bossData: [IBossData]
}
const BossReport = ({
  bossData,
}: IBossReport) => {
  const router = useRouter();
  const { report } = router.query;
  return (
    <Reports>
      {bossData.map((boss) => (
        <>
          <BossInfo bossInfo={boss.infos} kill={!!boss?.kill} />
          {boss.kill && (
          <Fight
            fight={boss.kill}
            report={report}
            router={router}
          />
          )}
          {boss.trys && boss.trys.map((killTry: IOnlyBossFight) => (
            <Fight
              fight={killTry}
              report={report}
              router={router}
            />
          ))}
        </>
      ))}
    </Reports>
  );
};

export default BossReport;
