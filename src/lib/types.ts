export const enum AttemptType {
	'Goal' = '0',
	'OnTarget' = '1',
	'Missed' = '2'
}

export interface playerStats {
	dfPlayerOverall: DfPlayerOverall[];
	dfShots: DfShot[];
	dfTeamOverall: DfTeamOverall[];
}

export interface DfPlayerOverall {
	D: number;
	GA: number;
	'GA/MP': number;
	GF: number;
	'GF/MP': number;
	L: number;
	MP: number;
	Player: string;
	Pts: number;
	'Pts/MP': number;
	W: number;
	playerId: number;
}

export interface DfShot {
	'0-15_attempts': number;
	'0-15_goals': number;
	'15-30_attempts': number;
	'15-30_goals': number;
	'30-45_attempts': number;
	'30-45_goals': number;
	'45-60_attempts': number;
	'45-60_goals': number;
	'60-75_attempts': number;
	'60-75_goals': number;
	'75-90_attempts': number;
	'75-90_goals': number;
	'90-inf_attempts': number;
	'90-inf_goals': number;
	A: number;
	'A/MP': number;
	'Assist to Goal Ratio': number;
	AvgShotDistance: number;
	ClutchGoals: number;
	'Conversion Rate': number;
	G: number;
	'G/MP': number;
	'LongRangeGoalRatio(16m+)': number;
	MP: number;
	'Penalty Attempts': number;
	'Penalty Conversion Rate': number;
	'Penalty Goals': number;
	Player: string;
	Rank: number;
	S: number;
	'S/G': number;
	'S/MP': number;
	'Shot Accuracy': number;
	SoT: number;
	'SoT/MP': number;
	playerId: number;
}

export interface DfTeamOverall {
	D: number;
	GA: number;
	'GA/MP': number;
	GF: number;
	'GF/MP': number;
	L: number;
	MP: number;
	Pts: number;
	'Pts/MP': number;
	Rank: number;
	Team: string;
	W: number;
	id: number;
}
