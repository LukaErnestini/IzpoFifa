import prisma from '$lib/prisma';
import type { Session } from '@supabase/supabase-js';
import { error, fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	create: async ({ request, locals }) => {
		const session = (await locals.getSession()) as Session;
		const userId = session.user.id;

		try {
			const activeGameday = await prisma.gameday.findFirst({ where: { userId, active: true } });
			if (activeGameday) {
				throw error(409, 'Active gameday already exists. End it first.');
			}

			const data = await request.formData();
			// Array of player id's
			const players = await data.getAll('players[]').map((id) => {
				return { id: +id };
			});
			// console.log(players);

			const gameday = await prisma.gameday.create({
				data: {
					userId,
					active: true,
					players: {
						create: players.map((playerId) => ({
							player: { connect: { id: playerId.id } }
						}))
					}
				}
			});

			return { gameday };
		} catch (error) {
			console.log(error);
		}
	},
	createGame: async ({ request, locals }) => {
		const session = (await locals.getSession()) as Session;
		const userId = session.user.id;

		// TODO refactor this code, there is some duplication.
		const data = await request.formData();
		const gamedayId = data.get('gamedayId')?.toString();
		if (!gamedayId) {
			return fail(400, { error: 'Gameday id is missing' });
		}
		const team1players = data.getAll('team1').map((e) => +e);
		const team2players = data.getAll('team2').map((e) => +e);

		if (!team1players.length || !team2players.length) {
			return fail(400, { error: 'Players for the team need to be selected' });
		}
		if (team1players.length !== team2players.length) {
			return fail(400, { error: 'Teams should be of same size' });
		}

		try {
			const possibleTeams1 = await prisma.team.findMany({
				where: {
					userId,
					players: { every: { playerId: { in: team1players } } }
				},
				include: { players: { include: { player: true } } }
			});
			// The bellow step is necessary because the query returns teams
			// that contain a subset of the team1players as well
			// Meaning that single player teams satisfy the condition.
			// I did not know how to correct the query, so this is the current solution
			const team1 = possibleTeams1.find((team) => team.players.length === team1players.length);
			if (!team1) {
				throw fail(404, { error: 'No team with selected players found.' });
			}
			const possibleTeams2 = await prisma.team.findMany({
				where: {
					userId,
					players: { every: { playerId: { in: team2players } } }
				},
				include: { players: { include: { player: true } } }
			});
			const team2 = possibleTeams2.find((team) => team.players.length === team2players.length);
			if (!team2) {
				throw fail(400, { error: 'No team with selected players found.' });
			}

			const game = await prisma.game.create({
				data: {
					gamedayId: +gamedayId,
					teamAId: team1.id,
					teamBId: team2.id
				},
				include: { teamA: true, teamB: true }
			});

			return { game };
		} catch (error) {
			console.log(error);
			throw fail(500, { error: 'Something went wrong.' });
		}
	}
};
