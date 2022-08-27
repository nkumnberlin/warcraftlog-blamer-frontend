import React from 'react';
import {
  DrawerBody, DrawerOverlay, DrawerContent, Drawer, DrawerCloseButton, useDisclosure,
} from '@chakra-ui/react';
import styled, { css } from 'styled-components';
import { IPlayerDetails, IRoleDetails } from '../../interfaces/FightResponse';
import { IRoleEventData } from '../../interfaces/EventDataPlayer';
import ListOfPlayerRoles from '../../features/player/listOfPlayerRoles';
import { DrawerButton } from '../button';

const Container = styled.div<{hasPlayerSelected:boolean}>`
    ${(props) => !props.hasPlayerSelected && css`
      display: flex;
      justify-content: center;
      margin:0 auto;
    `}
`;

const StyledDrawerContent = styled(DrawerContent)`
  background: #000 !important;
  color: white;
  border-right: 2px solid rgba(255, 255, 255, 0.4);
`;

const StyledDrawerBody = styled(DrawerBody)`
  padding: 1rem !important;
`;

interface IPlayerTypeList {
  roles: IRoleDetails,
  parses: {dps: {'': number}, hps:{'': number}}
  selectPlayer: (player: IPlayerDetails) => void;
  selectedPlayer: number;
  eventData: IRoleEventData
}
function PlayerDrawer(props: IPlayerTypeList) {
  const { selectedPlayer } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Container hasPlayerSelected={!!selectedPlayer}>
      <DrawerButton hasPlayerSelected={!!selectedPlayer} action={onOpen} text="Click here to Select a Player" />
      <Drawer closeOnOverlayClick onClose={onClose} placement="left" isOpen={isOpen} size="md">
        <DrawerOverlay />
        <StyledDrawerContent>
          <DrawerCloseButton />
          <StyledDrawerBody className="bb">
            <ListOfPlayerRoles {...props} />
          </StyledDrawerBody>
        </StyledDrawerContent>
      </Drawer>
    </Container>
  );
}

export default PlayerDrawer;
