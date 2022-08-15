import React from 'react';
import styled from 'styled-components';
import { IGear } from '../../../interfaces/FightResponse';
import GearLinkToolTip from '../../../components/tooltip/gearToolTip';

interface IGearList{
  gear: IGear
  children: React.ReactNode
}

const GearLinkContainer = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid rgba(255, 255, 255, 0.2);
  height: 100%;
`;

const ToolTipContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  min-height: 3rem;
  min-width: 20rem;
  padding-left: 1rem;
`;

function GearList({ gear, children }:IGearList) {
  return (
    <>
      {gear.id !== 0
        && (
        <GearLinkContainer>
          <ToolTipContainer>
            <GearLinkToolTip gear={gear} />
          </ToolTipContainer>
          <div>
            {gear.metaEnchant && (
            <div>
              This Item is missing:
              {' '}
              {gear.metaEnchant.error}
            </div>
            )}
            {gear.metaGem && (
            <div>
              This Item is missing:
              {' '}
              {gear.metaGem.error}
            </div>
            )}
            {children}
          </div>
        </GearLinkContainer>
        )}
    </>

  );
}

export default GearList;
