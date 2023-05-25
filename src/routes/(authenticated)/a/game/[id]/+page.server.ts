import prisma from '$lib/prisma';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const id = +params.id;
	try {
		const game = prisma.game.findFirst({
			where: { id },
			include: {
				attempts: true,
				fouls: true,
				teamA: { include: { players: { include: { player: true } } } },
				teamB: { include: { players: { include: { player: true } } } }
			}
		});
		return { game };
	} catch (error) {
		console.log(error);
		throw fail(500, { error: 'Something went wrong.' });
	}
	return {};
};
