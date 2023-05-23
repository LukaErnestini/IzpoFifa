import prisma from '$lib/prisma';
import type { Gameday } from '@prisma/client';
import type { Session } from '@supabase/supabase-js';
import { error } from '@sveltejs/kit';

import type { Actions } from './$types';

export const actions: Actions = {
	create: async ({ request, locals }) => {
		const session = (await locals.getSession()) as Session;
		const userId = session.user.id;

		try {
			const activeGameday = await prisma.gameday.findFirst({ where: { active: true } });
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
	}
};
