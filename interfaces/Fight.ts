export interface IFightDetails {
    difficulty: number;
    name: string;
    id: number;
    kill: string;
    fightPercentage: number;
    friendlyPlayers: [number];
}

export interface IFight {
    fight: IFightDetails,
    report: {
        endTime: number;
        startTime: number;
        guild: { name: string; id: number; faction: { name: string } };
    }
}
