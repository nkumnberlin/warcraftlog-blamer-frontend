export interface ISingleReport {
    endTime: number;
    startTime: number;
    guild: { name: string; id: number; faction: { name: string } };
}

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

export interface IOnlyBossFights {
    onlyBossFights: [IOnlyBossFight]
}

export interface IRaidId {
    singleReport: ISingleReport,
    onlyBossFights: [
        IOnlyBossFight
    ];
}
