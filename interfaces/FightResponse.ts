import { ISingleReport } from './Raid';

interface IStats {
  Hit: {
    min: number,
    max: number
  },
  Intellect: {
    min: number,
    max: number
  },
  Agility: {
    min: number,
    max: number
  },
  Crit: {
    min: number,
    max: number
  },
  ItemLevel: {
    min: number,
    max: number
  },
  Spirit: {
    min: number,
    max: number
  },
  Strength: {
    min: number,
    max: number
  },
  Stamina: {
    min: number,
    max: number
  },
  Expertise: {
    min: number,
    max: number
  },
  Haste: {
    min: number,
    max: number
  },
}

export interface IGuild {
  server: {
    name: string,
    slug: string,
    region: {
      compactName: string,
    }
  };
}

export interface IGems {
  id: number,
  itemLevel: number,
  icon: string,
}

export interface IGear {
  id: number,
  slot: number,
  quality: number,
  icon: string,
  name: string,
  itemLevel: number,
  permanentEnchant: number,
  permanentEnchantName: string,
  gems: IGems[],
  setID: number,
}

interface ICombatantInfo {
  stats: IStats,
  gear: IGear[]
}

export interface IPlayer {
  name: string,
  id: number,
  guid: number,
  type: string,
  server: string,
  icon: string,
  specs: [string],
  minItemLevel: number,
  maxItemLevel: number,
}

export interface IGearMeta {
  error: string;
}

export interface ICheckGem {
  gear: IGear,
  meta: IGearMeta
}

export interface IGemMeta {
  note: string,
}

export interface ICheckGemQuality {
  gem: IGems,
  meta: IGemMeta
}

export interface ICheckGems {
  gems: ICheckGem[],
  quality: ICheckGemQuality[]
}

export interface IEnchantMeta {
  error: string;
}

interface IPlayerDetails {
  player: IPlayer
  enchantSummary: {
    gear: IGear,
    meta: IEnchantMeta
  },
  gemSummary: {
    gems: {
      gear: IGear,
      meta: IGemMeta
    },
    quality: {
      gem: IGems,
      meta: IGemMeta
    }
  }
}

export interface IRoleDetails {
  healers: IPlayerDetails[],
  dps: IPlayerDetails[],
  tanks: IPlayerDetails[]
}

// events todo
export interface IFightResponse {
  singleReport: ISingleReport,
  guild: IGuild,
  player: {
    gear: IRoleDetails,
    events: {
      damageDone: object,
      healingDone: object,
      deathEvents: object,
      damageTaken: object
    }
  }
}
