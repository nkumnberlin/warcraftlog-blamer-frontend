export interface AbilitiesWithIcon {
  gameID: number;
  icon: string;
  name: string;
  type: string;
}

export interface Aura {
  source: number;
  ability: number;
  stacks: number;
  icon: string;
  name: string;
}

export interface ClassResource {
  amount: number;
  max: number;
  type: number;
}

export interface IAbility {
  timestamp: number;
  type: string;
  sourceID: number;
  amount: number | number[];
  targetID: number;
  resourceChange: number;
  abilityGameID: number;
  fight: number;
  resourceActor: number;
  classResources: ClassResource[];
  hitPoints: number;
  maxHitPoints: number;
  attackPower: number;
  spellPower: number;
  armor: number;
  x: number;
  y: number;
  killerID: string;
  facing: number;
  mapID: number;
  itemLevel: number;
  sameSource: boolean;
}

export interface AbilityNumber {
  [abilityNumber: string]: IAbility[];
}

export interface AbilitiesOfPlayer {
  cast: AbilityNumber;
  damage: AbilityNumber;
  resourcechange: AbilityNumber;
  heal: AbilityNumber;
  cooldowns: AbilityNumber;
}

export interface IBuffs {
  [abilityId: string] : IAbility[]
}

export interface AbilityResponse {
  abilitiesWithIcon: AbilitiesWithIcon[];
  auras: Aura[];
  abilities: IBuffs[];
  buffs: IBuffs[]
}
