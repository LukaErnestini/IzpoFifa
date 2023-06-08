import type { Actions } from './$types';
import prisma from '$lib/prisma';
import { fail, redirect } from '@sveltejs/kit';
import { createTeamName, genRanHex } from '$lib/util';
import type { Session } from '@supabase/supabase-js';

export const actions = {
	default: async ({ request, locals }) => {
		// We can assume the user is logged in here
		const session = (await locals.getSession()) as Session;
		const userId = session.user.id;
		const data = await request.formData();
		const name = data.get('name')?.toString();

		if (!name) {
			return fail(400, { error: true, message: 'Missing name' });
		}
		try {
			const exists = await prisma.player.findFirst({
				where: { name: { equals: name, mode: 'insensitive' }, userId }
			});
			if (exists) {
				return fail(409, { error: true, message: 'Player by that name already exists' });
			}

			const players = await prisma.player.findMany({ where: { userId } });
			const newPlayer = await prisma.player.create({
				data: {
					name,
					userId
				}
			});

			// Create teams with the new player
			await prisma.team.create({
				data: {
					userId,
					color: '#' + genRanHex(6),
					name: createTeamName([newPlayer.name]),
					players: { create: [{ player: { connect: { id: newPlayer.id } } }] }
				}
			});

			// Team new player with existing
			for (let i = 0; i < players.length; i++) {
				await prisma.team.create({
					data: {
						userId,
						color: '#' + genRanHex(6),
						name: createTeamName([newPlayer.name, players[i].name]),
						players: {
							create: [
								{ player: { connect: { id: newPlayer.id } } },
								{ player: { connect: { id: players[i].id } } }
							]
						}
					}
				});
			}
		} catch (error) {
			console.log(error);
			return fail(500, { error: true, message: 'Something went wrong' });
		}

		throw redirect(303, '/a/players');
	}
} satisfies Actions;
