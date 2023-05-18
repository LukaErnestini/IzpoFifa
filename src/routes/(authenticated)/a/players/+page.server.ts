import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const players = await prisma.player.findMany();
	return { players };
}) satisfies PageServerLoad;
