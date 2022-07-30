import React from 'react';
import styled from 'styled-components';
import { IGear } from '../../../interfaces/FightResponse';
import GemToolTip from '../../tooltip/gemToolTip';

interface IGemsList {
  gear: IGear,
  id: number
}

const GemsListContainer = styled.div`
  display:flex
`;

const GemIssues = styled.div`
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`;

const GemError = styled.span`
  padding-left: 0.5rem;
`;

// only show Gems of interest if a note is linked to a gem
function GemsList({ gear, id }: IGemsList) {
  return (
    <GemsListContainer>
      {gear.gems && gear.gems[id]?.metaGem?.note && (
        <GemIssues>
          <GemToolTip gem={gear.gems[id]} />
          <GemError>
            Gem issue:
            {' '}
            {gear.gems[id]?.metaGem?.note}
          </GemError>
        </GemIssues>
      )}
    </GemsListContainer>
  );
}

export default GemsList;
