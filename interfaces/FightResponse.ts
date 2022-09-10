import { IRoleEventData } from './EventDataPlayer';

export interface IGuild {
  name: string,
  id: number
  faction:{
    name: string
  }
  server: {
    name: string,
    slug: string,
    region: {
      compactName: string,
    }
  };
}

export interface IGearMeta {
  metaEnchant: {
    error: string;
  }
  metaGem: {
    error: string
  }
}

export interface IGemMeta {
  note: string,
}
export interface IGems{
  id: number,
  itemLevel: number,
  icon: string,
  metaGem?: IGemMeta
}

export interface IGear extends IGearMeta{
  id: number,
  slot: number,
  quality: number,
  icon: string,
  name: string,
  itemLevel: number,
  permanentEnchant: number,
  permanentEnchantName: string,
  gems?: IGems[],
  setID: number,
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
  hasIssues: boolean,
  role?: string
}

export interface IPlayerDetails extends IPlayer {
  gearSummary: IGear[],
}

export interface IRoleDetails {
  healers: IPlayerDetails[];
  dps: IPlayerDetails[];
  tanks: IPlayerDetails[];
}

export interface IEnemies {
  name: string,
  id: number,
  gameID: number
}

export interface IFightResponse extends IRoleEventData{
  guild: IGuild,
  player: IRoleDetails,
  enemies: IEnemies[],
}
