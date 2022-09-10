import React from 'react';
import { Progress } from '@chakra-ui/react';
import { IPlayerDetails } from '../../interfaces/FightResponse';
import { IEventDataPlayer } from '../../interfaces/EventDataPlayer';

interface IEventData {
  eventData: IEventDataPlayer,
  player: IPlayerDetails
}
function EventDataToPlayer({
  eventData, player,
}: IEventData) {
  const { role } = player;
  if (role === 'dps' || role === 'tanks') {
    const { cumulatedDmg, damageDone } = eventData;
    const damageOfPlayer = damageDone.find((damage) => damage.id === player.id) || { total: 0 };
    const percentage = damageOfPlayer?.total / (cumulatedDmg / 100);
    console.log(cumulatedDmg, damageOfPlayer, damageDone);
    return (
      <>
        {' '}
        {Math.round(percentage * 100) / 100}
        {' '}
      </>
    );
  }

  const { cumulatedHeal, healingDone } = eventData;
  const healOfPlayer = healingDone.find((heal) => heal.id === player.id) || { total: 0 };
  const percentage = cumulatedHeal / healOfPlayer?.total;
  return (
    <Progress value={percentage} size="lg" colorScheme="pink" />
  );
}

export default EventDataToPlayer;
