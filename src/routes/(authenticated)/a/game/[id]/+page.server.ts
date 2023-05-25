import prisma from '$lib/prisma';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

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
};

export const actions = {
	remove: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id') ? +(data.get('id') as string) : undefined;

		try {
			console.log('removing game with id ' + id);
			const deleteAttempts = prisma.attempt.deleteMany({ where: { gameId: id } });
			const deleteFouls = prisma.foul.deleteMany({ where: { gameId: id } });
			const deleteGames = prisma.game.delete({ where: { id } });
			await prisma.$transaction([deleteAttempts, deleteFouls, deleteGames]);
		} catch (error) {
			console.log(error);
			throw fail(500, { error: 'An unexpected error occured.' });
		}
		throw redirect(301, '/a/gameday');
		// TODO check all HTTP codes in the app. Is their meaning correct?
	}
} satisfies Actions;
