import type { Actions, PageServerLoad } from './$types';
import prisma from '$lib/prisma';
import { fail, redirect } from '@sveltejs/kit';
import { createTeamName, genRanHex } from '$lib/util';
import type { Session } from '@supabase/supabase-js';

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, locals }) => {
		const session = (await locals.getSession()) as Session;
		const userId = session.user.id;
		const data = await request.formData();
		const name = data.get('name')?.toString() as string;
		try {
			const existing = await prisma.player.findFirst({ where: { name, userId } });
			if (existing) {
				return fail(409, { exists: true, message: 'Player by that name alaready exists' });
			}
			const players = await prisma.player.findMany();
			const newPlayer = await prisma.player.create({
				data: {
					name,
					userId
				}
			});
			prisma.team
				.create({
					data: {
						userId,
						color: '#' + genRanHex(6),
						name: createTeamName([newPlayer.name]),
						Player: { connect: [{ id: newPlayer.id }] }
					}
				})
				.then();
			for (let i = 0; i < players.length; i++) {
				prisma.team
					.create({
						data: {
							userId,
							color: '#' + genRanHex(6),
							name: createTeamName([newPlayer.name, players[i].name]),
							Player: {
								connect: [{ id: players[i].id }, { id: newPlayer.id }]
							}
						}
					})
					.then();
			}
		} catch (error) {
			console.log(error);
		}
		throw redirect(303, '/a/players');
	}
} satisfies Actions;
