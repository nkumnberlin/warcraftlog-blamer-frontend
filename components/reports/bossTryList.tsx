import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { IBossData, IOnlyBossFight } from '../../interfaces';
import BossDetail from './bossDetail';
import Fight from './fight';

const FightContainer = styled.div`
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
    <>
      {bossData.map((boss) => (
        <FightContainer key={boss.infos.encounterID}>
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
              key={killTry.encounterID}
              fight={killTry}
              report={report}
              router={router}
            />
          ))}
        </FightContainer>
      ))}
    </>
  );
};

export default BossTryList;
