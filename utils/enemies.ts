import { IEnemies, IPlayer } from '../interfaces/FightResponse';
import { IAllPlayers } from '../interfaces';

interface ISetEnemyToID {
  target: string,
  allPlayers: IAllPlayers;
  enemies: IEnemies[]
}

export function findTargetName({
  target,
  allPlayers,
  enemies,
}: ISetEnemyToID) {
  const targetID = parseInt(target, 10);
  const player: IPlayer = allPlayers[targetID as unknown as keyof IAllPlayers];
  if (player) {
    return `Target: ${player.name}`;
  }
  const possibleEnemy = enemies.find((enemy) => enemy.id === targetID);
  if (possibleEnemy) {
    return possibleEnemy.name;
  }
  return 'Faint Death or Environment';
}

export function isEnemy(target: string, enemies: IEnemies[]) {
  const targetID = parseInt(target, 10);
  const possibleEnemy = enemies.find((enemy) => enemy.id === targetID);
  return possibleEnemy?.name !== 'Environment' && !possibleEnemy?.name;
}
