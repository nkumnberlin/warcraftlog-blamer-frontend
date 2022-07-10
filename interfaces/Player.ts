export interface IPlayer {
    guid: number;
    name: string;
    type: string;
    id: number;
    maxItemLevel: number;
    specs: [
        {
            spec: string;
        }
    ];
}

export interface IPlayerDetails {
    tank: IPlayer[],
    healer: IPlayer[],
    dps: IPlayer[]
}

export type PlayerRoles = keyof IPlayerDetails
