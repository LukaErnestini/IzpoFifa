import prisma from '$lib/prisma';
import type { LayoutServerLoad } from './$types';
import type { Session } from '@supabase/supabase-js';
import { fail, redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ locals, parent }) => {
	const session = (await locals.getSession()) as Session;
	const userId = session.user.id;
	const data = await parent();
	if (!data.activeGameday) {
		throw redirect(302, '/gameday');
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

		if (!activeGame) {
			throw redirect(302, '/gameday');
		}

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
