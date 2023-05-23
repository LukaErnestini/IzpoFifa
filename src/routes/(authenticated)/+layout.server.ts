import prisma from '$lib/prisma';
import type { LayoutServerLoad } from './$types';
import type { Session } from '@supabase/supabase-js';

export const load: LayoutServerLoad = async ({ locals }) => {
	const session = (await locals.getSession()) as Session;
	const userId = session.user.id;

	const activeGameday = await prisma.gameday.findFirst({
		where: { active: true, userId },
		include: {
			games: {
				include: {
					teamA: { include: { teamA: true } },
					teamB: { include: { teamB: true } },
					winner: true
				},
				orderBy: { id: 'asc' }
			},
			players: { include: { player: true } }
		}
	});

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

	return {
		activeGameday,
		finishedGamedays,
		teams,
		players
	};
};
