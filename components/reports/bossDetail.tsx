import React from 'react';
import styled from 'styled-components';
import { IOnlyBossFight } from '../../interfaces';

const BossInfoContainer = styled.div<{isKilled?: boolean}>`
  margin: 2rem 0 0 0;
  background: ${(props) => (props.isKilled ? 'green' : 'tomato')};
`;

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
const ListItem = styled.p`
  min-width: 10rem;
  max-width: 30rem;
`;

interface IBossInfo {
    bossInfo: IOnlyBossFight,
    kill: boolean
}

const BossDetail = ({ bossInfo, kill }: IBossInfo) => (
  <BossInfoContainer isKilled={kill}>
    <Item isListItem key={bossInfo.id}>
      <ListItem>{bossInfo.name}</ListItem>
      <ListItem>
        {kill ? 'Killed' : 'Alive'}
      </ListItem>
    </Item>
  </BossInfoContainer>
);

export default BossDetail;
