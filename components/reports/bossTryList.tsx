import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { IBossData, IOnlyBossFight } from '../../interfaces';
import BossDetail from './bossDetail';
import Fight from './fight';

const FightContainer = styled.div`
  padding-left: 5rem;
`;

const Reports = styled.div`
  margin-top: 2rem;
`;

export interface IBossReport {
  bossData: [IBossData]
}
const BossTryList = ({
  bossData,
}: IBossReport) => {
  const router = useRouter();
  const { report } = router.query;
  return (
    <Reports>
      {bossData.map((boss) => (
        <FightContainer>
          <BossDetail bossInfo={boss.infos} kill={!!boss?.kill} />
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

export default BossTryList;
