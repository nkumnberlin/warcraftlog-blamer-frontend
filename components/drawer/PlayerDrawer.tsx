import React, { useEffect } from 'react';
import {
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  Drawer,
  DrawerCloseButton,
  useDisclosure,
  FormControl,
  Switch, FormLabel,
} from '@chakra-ui/react';
import styled, { css } from 'styled-components';
import { IPlayerDetails, IRoleDetails } from '../../interfaces/FightResponse';
import { IRoleEventData } from '../../interfaces/EventDataPlayer';
import PlayerList from '../../features/player/PlayerList';
import { DrawerButton } from '../button';

const Container = styled.div<{hasplayerselected?:boolean}>`
    ${(props) => !props.hasplayerselected && css`
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
  setSecondPlayer: (player: IPlayerDetails) => void;
  selectedPlayer: number;
  comparePlayers: boolean;
  eventData: IRoleEventData;
  setComparePlayers: (val: boolean) => void;
}
function PlayerDrawer(props: IPlayerTypeList) {
  const { selectedPlayer, setComparePlayers, comparePlayers } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => { if (comparePlayers) { onOpen(); } }, [comparePlayers, onOpen]);
  useEffect(() => { if (selectedPlayer) { onClose(); } }, [selectedPlayer, onClose]);

  return (
    <Container hasplayerselected={selectedPlayer ? true : undefined}>
      <DrawerButton hasPlayerSelected={!!selectedPlayer} action={onOpen} text="Click here to Select a Player" />
      {selectedPlayer ? (
        <FormControl style={{ paddingLeft: '0.5rem' }} display="flex" flexDir="column">
          <FormLabel htmlFor="secondPlayer" mb="0">
            Compare with Second Player?
            <br />
            Disable to stop comparison.
          </FormLabel>
          <Switch
            onChange={(event) => setComparePlayers(event.target.checked)}
            style={{ marginTop: '1rem' }}
            size="md"
            id="secondPlayer"
          />
        </FormControl>
      ) : null}
      <Drawer closeOnOverlayClick onClose={onClose} placement="left" isOpen={isOpen} size="md">
        <DrawerOverlay />
        <StyledDrawerContent>
          <DrawerCloseButton />
          <StyledDrawerBody className="bb">
            <PlayerList {...props} />
          </StyledDrawerBody>
        </StyledDrawerContent>
      </Drawer>
    </Container>
  );
}

export default PlayerDrawer;
