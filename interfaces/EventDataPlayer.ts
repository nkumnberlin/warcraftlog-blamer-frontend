export interface IPlayerEventData {
  guid: number,
  icon: string,
  id: number
  name: string,
  total: number
  type: string,
}
export interface IRoleEventData {
  damageDone: IPlayerEventData[],
  healingDone: IPlayerEventData[],
  deathEvents: IPlayerEventData[],
}

export interface IEventDataPlayer extends IRoleEventData {
  cumulatedDmg: number,
  cumulatedHeal: number,
}
