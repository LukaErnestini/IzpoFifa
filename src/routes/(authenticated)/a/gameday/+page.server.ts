import prisma from '$lib/prisma';
import type { Session } from '@supabase/supabase-js';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ params, locals }) => {
	const session = (await locals.getSession()) as Session;
	const userId = session.user.id;

	const gameday = await prisma.gameday.findFirst({
		where: { active: true, userId },
		include: {
			games: {
				include: {
					teamA: { include: { teamA: true } },
					teamB: true,
					winner: true
				},
				orderBy: { id: 'asc' }
			},
			players: { include: { player: true } }
		}
	});

	if (gameday) return { gameday };

	const finishedGamedays = await prisma.gameday.findMany({
		where: { active: false, userId },
		include: {
			games: {
				include: {
					teamA: true,
					teamB: true,
					winner: true
				},
				orderBy: { id: 'asc' }
			},
			players: { include: { player: true } }
		}
	});

	const teams = prisma.team.findMany({
		where: { userId },
		include: { players: { include: { player: true } } }
	});

	const players = await prisma.player.findMany({ where: { userId } });

	return { teams, finishedGamedays, players };
}) satisfies PageServerLoad;
