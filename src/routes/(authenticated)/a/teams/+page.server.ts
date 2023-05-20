import prisma from '$lib/prisma';
import type { Session } from '@supabase/supabase-js';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const session = (await locals.getSession()) as Session;
	const userId = session.user.id;

	const teams = prisma.team.findMany({
		where: { userId },
		include: { players: { include: { player: true } } }
	});

	return { teams };
}) satisfies PageServerLoad;
