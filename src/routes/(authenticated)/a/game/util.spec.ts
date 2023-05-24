import { getTeammates } from './util';
import type { Player } from '@prisma/client';
import { test, expect, describe } from 'vitest';

describe('getTeammates', () => {
	const player1: Player = { id: 1, imageUri: '', name: 'a', userId: 'uuid' };
	const player2: Player = { id: 2, imageUri: '', name: 'a', userId: 'uuid' };
	const player3: Player = { id: 3, imageUri: '', name: 'a', userId: 'uuid' };

	const team1 = [player1, player2];
	const team2 = [player3];

	test('should return an empty array if any parameter is not defined', () => {
		expect(getTeammates(undefined, team2, 1)).toEqual([]);
		expect(getTeammates(team1, undefined, 1)).toEqual([]);
		expect(getTeammates(team1, team2, null)).toEqual([]);
	});

	test('should return the teammates from the same team if inverse is false', () => {
		expect(getTeammates(team1, team2, 1)).toEqual(team1);
		expect(getTeammates(team1, team2, 3)).toEqual(team2);
	});

	test('should return the players from the opposing team if inverse is true', () => {
		expect(getTeammates(team1, team2, 1, true)).toEqual(team2);
		expect(getTeammates(team1, team2, 3, true)).toEqual(team1);
	});
});
