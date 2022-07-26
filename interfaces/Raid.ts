export interface IOnlyBossFight {
    difficulty: number;
    name: string;
    id: number;
    kill: string;
    fightPercentage: number;
    startTime: number;
    endTime: number;
    encounterID: string
}

export interface ISingleReport {
    endTime: number;
    startTime: number;
    zone: {
        name: string
    }
    fights?: [IOnlyBossFight],
    guild: { name: string; id: number; faction: { name: string } };
}
export interface IBossData {
    kill: IOnlyBossFight | undefined,
    trys: [IOnlyBossFight] | undefined,
    infos: IOnlyBossFight
}
