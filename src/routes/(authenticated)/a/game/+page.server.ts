import prisma from '$lib/prisma';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import type { Actions } from './$types';

// TODO [security]: allow only owner of gameday to edit game day related data
// currently a user could edit gameId input field and thus edit games belonging to some other user

export const load: PageServerLoad = async ({ parent }) => {
	const data = await parent();
	if (!data.activeGameday?.games.find((game) => !game.finished)) {
		throw redirect(302, 'gameday');
	}
	const gamedayId = data.activeGameday.id;

	try {
		const activeGame = await prisma.game.findFirst({
			where: { gamedayId, finished: false },
			include: {
				teamA: { include: { players: { include: { player: true } } } },
				teamB: { include: { players: { include: { player: true } } } }
			}
		});

		if (!activeGame) throw fail(404, { error: 'Game not found' });

		const attempts = await prisma.attempt.findMany({
			where: { gameId: activeGame.id },
			orderBy: { time: 'desc' }
		});

		const fouls = await prisma.foul.findMany({
			where: { gameId: activeGame.id },
			orderBy: { time: 'desc' }
		});

		return { activeGame, attempts, fouls };
	} catch (error) {
		console.log(error);
		throw fail(500, { error: 'Something went wrong' });
	}
};

export const actions: Actions = {
	attempt: async ({ request }) => {
		const data = await request.formData();
		const gameId = data.get('gameId') ? +(data.get('gameId') as string) : undefined;
		const shooterId = data.get('shooter') ? +(data.get('shooter') as string) : undefined;
		if (!shooterId) return fail(400, { error: 'A shooter must be selected.', tag: 'shooter' });
		const goal = data.get('goal') ? true : false;
		const autogoal = data.get('autogoal') ? true : false;
		const onTarget = data.get('onTarget') ? true : false;
		const penalty = data.get('penalty') ? true : false;
		const time = +(data.get('time') as string);
		const x = data.get('x') ? +(data.get('x') as string) : null;
		const y = data.get('y') ? +(data.get('y') as string) : null;
		const distance = data.get('distance') ? +(data.get('distance') as string) : -1;
		const assistedId = data.get('assisted') ? +(data.get('assisted') as string) : undefined;
		const goalieId = data.get('goalie') ? +(data.get('goalie') as string) : undefined;

		try {
			const attempt = await prisma.attempt.create({
				data: {
					goal,
					autogoal,
					onTarget: goal ? true : onTarget,
					penalty,
					time,
					x,
					y,
					distance: distance > 0 ? distance : null,
					shooter: { connect: { id: shooterId } },
					assisted: assistedId ? { connect: { id: assistedId } } : undefined,
					goalie: goalieId ? { connect: { id: goalieId } } : undefined,
					Game: { connect: { id: gameId } }
				}
			});
			if (goal) await tallyScore(gameId);
		} catch (error) {
			console.log(error);
			fail(500, { error: 'An unexpected error occured.' });
		}
	},
	red: async ({ request }) => {
		await card('red', request);
	},
	yellow: async ({ request }) => {
		await card('yellow', request);
	},
	removeAttempt: async ({ request }) => {
		const data = await request.formData();
		const id = +(data.get('id') as string);
		try {
			await prisma.attempt.delete({ where: { id } });
		} catch (error) {
			console.log(error);
			throw fail(500, { error: 'An unexpected error occured.' });
		}
	},
	removeFoul: async ({ request }) => {
		const data = await request.formData();
		const id = +(data.get('foulId') as string);
		try {
			await prisma.foul.delete({ where: { id } });
		} catch (error) {
			console.log(error);
			throw fail(500, { error: 'An unexpected error occured.' });
		}
	},
	endGame: async ({ request }) => {
		try {
			const data = await request.formData();
			const gameId = data.get('gameId') ? +(data.get('gameId') as string) : undefined;
			const game = await prisma.game.findFirst({ where: { id: gameId } });
			if (!game) throw fail(404, { error: 'Game not found.' });

			let winnerId: number | null = null; // null = draw
			if (game.scoreTeamA > game.scoreTeamB) winnerId = game.teamAId;
			else if (game.scoreTeamA < game.scoreTeamB) winnerId = game.teamBId;

			await prisma.game.update({
				where: { id: game.id },
				data: { finished: true, winnerId }
			});
		} catch (error) {
			console.log(error);
		}
	}
};

const card = async (card: string, request: Request) => {
	const data = await request.formData();
	const time = data.get('time') ? +(data.get('time') as string) : null;
	const shooterId = data.get('shooter') ? +(data.get('shooter') as string) : undefined;
	const gameId = data.get('gameId') ? +(data.get('gameId') as string) : undefined;
	const x = data.get('x') ? +(data.get('x') as string) : null;
	const y = data.get('y') ? +(data.get('y') as string) : null;

	try {
		await prisma.foul.create({
			data: {
				card,
				time,
				x,
				y,
				game: { connect: { id: gameId } },
				player: { connect: { id: shooterId } }
			}
		});
	} catch (error) {
		console.log(error);
		fail(500, { error: 'Some error occured.' });
	}
};

const tallyScore = async (gameId: number | undefined) => {
	let scoreTeamA = 0;
	let scoreTeamB = 0;

	try {
		const game = await prisma.game.findFirst({
			where: { id: gameId },
			include: {
				attempts: { include: { shooter: true } },
				teamA: { include: { players: true } },
				teamB: { include: { players: true } }
			}
		});

		if (!game) return fail(404, { error: 'Game not found.' });

		// Loop through the attempts and tally the scores
		for (const attempt of game.attempts) {
			if (attempt.goal) {
				if (game.teamA.players.find((e) => e.playerId === attempt.shooter.id)) {
					// The shooter is on teamA
					if (attempt.autogoal) scoreTeamB++;
					else scoreTeamA++;
				} else {
					if (attempt.autogoal) scoreTeamA++;
					else scoreTeamB++;
				}
			}
		}

		await prisma.game.update({
			where: { id: game.id },
			data: { scoreTeamA, scoreTeamB }
		});
	} catch (error) {
		console.log(error);
		fail(500, { error: 'An unexpected error occured' });
	}
};
