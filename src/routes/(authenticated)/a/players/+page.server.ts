import prisma from '$lib/prisma';
import type { Session } from '@supabase/supabase-js';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	delete: async ({ request, locals }) => {
		const session = (await locals.getSession()) as Session;
		const userId = session.user.id;
		const data = await request.formData();
		const id = data.get('id');

		if (!id) {
			return fail(400, { message: 'Missing id' });
		}

		try {
			const player = await prisma.player.findFirst({ where: { id: +id, userId } });
			if (!player) return fail(401, { error: 'Unauthorized' });

			const hasPlayed = await prisma.playersInGameday.findFirst({ where: { player } });
			if (hasPlayed)
				return fail(400, {
					error: 'Player is already part of some Gameday. Deleting him is disabled as of right now.'
				});

			// Cascade only deletes the row in pivot table, so the team must be deleted manually
			await prisma.team.deleteMany({
				where: { players: { some: { playerId: player.id } } }
			});

			// https://www.prisma.io/docs/concepts/components/prisma-schema/relations/referential-actions#referential-action-defaults
			await prisma.player.delete({
				where: { id: +id }
			});
		} catch (error) {
			console.log(error);
			return fail(500, { error: 'Something went wrong' });
		}

		return { success: true };
	}
};
