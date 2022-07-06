import React from 'react';
import styled from 'styled-components';
import { NextRouter, useRouter } from 'next/router';
import { IBossData, IOnlyBossFight } from '../../interfaces';
import FightDetails from '../fight/fightDetails';

const Item = styled.div<{ isListItem?: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  margin: 0 auto;
  padding: 0.5rem 0 0.5rem 0;
  border-bottom: ${(props) => (props.isListItem ? '1px solid rgba(255, 255, 255, 0.2)' : '')};

  :hover {
    background: #444444;
  }
`;

const BossInfoWrapper = styled.div<{isKilled?: boolean}>`
  margin: 2rem 0 0 0;
  background: ${(props) => (props.isKilled ? 'green' : 'tomato')};
`;

const FightContainer = styled.div`
  padding-left: 5rem;
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
    <FightDetails {...fight} />
  </Item>
);

interface IBossInfo {
  bossInfo: IOnlyBossFight,
  kill: boolean
}

const BossInfo = ({ bossInfo, kill }: IBossInfo) => (
  <BossInfoWrapper isKilled={kill}>
    <Item isListItem key={bossInfo.id}>
      <ListItem>{bossInfo.name}</ListItem>
      <ListItem>
        {kill ? 'Killed' : 'Alive'}
      </ListItem>
    </Item>
  </BossInfoWrapper>
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
        <FightContainer>
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
        </FightContainer>
      ))}
    </Reports>
  );
};

export default BossReport;
