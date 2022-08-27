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

export interface Ability {
  timestamp: number;
  type: string;
  sourceID: number;
  amount: number;
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

export interface TargetOfAbility {
  targetId: Ability[]
}

export interface AbilityNumber {
  abilityNumber: TargetOfAbility;
}

export interface Auras {
  auras: Aura[];
}

export interface AbilitiesOfPlayer {
  cast: AbilityNumber;
  damage: AbilityNumber;
  resourcechange: AbilityNumber;
  heal: AbilityNumber;
}

export interface AurasAndAbilitiesOfPlayer extends AbilitiesOfPlayer, Auras {
  name: string;
}

export interface AbilityResponse {
  abilitiesWithIcon: AbilitiesWithIcon[];
  abilitiesOfPlayer: AurasAndAbilitiesOfPlayer;
}
