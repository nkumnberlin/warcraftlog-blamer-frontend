import React from 'react';
import { NextRouter } from 'next/router';
import styled from 'styled-components';
import { useToast } from '@chakra-ui/react';
import FightDetails from './fightDetail';
import { IOnlyBossFight } from '../../interfaces';

const Item = styled.div<{ isListItem?: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  margin: 0 auto;
  padding: 0  0 0.5rem 0;
  border-bottom: ${(props) => (props.isListItem ? '1px solid rgba(255, 255, 255, 0.2)' : '')};

  :hover {
    background: #444444;
  }
`;

interface IFight {
  fight: IOnlyBossFight,
  report: string | string[] | undefined,
  router: NextRouter
}

function Fight({ fight, router, report }:IFight) {
  const toast = useToast();
  async function selectFight() {
    router.push('/[report]/[fight]',
      `${report}/${fight.id}?fight=${fight.id}&encounterID=${fight.encounterID}&startTime=${fight
        .startTime}&endTime=${fight.endTime}`);
    toast({
      title: 'Report will be created.',
      description: 'Please wait 3 or 5 sec.',
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
  }

  return (
    <Item
      isListItem
      key={fight.id}
      onClick={() => selectFight()}
    >
      <FightDetails {...fight} />
    </Item>
  );
}

export default Fight;
