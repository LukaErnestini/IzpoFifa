import type { Actions, PageServerLoad } from './$types';
import prisma from '$lib/prisma';
import { fail, redirect } from '@sveltejs/kit';
import { connect } from 'http2';
import { createTeamName, genRanHex } from '$lib/util';

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const name = data.get('name')?.toString() as string;
		try {
			const existing = await prisma.player.findFirst({ where: { name } });
			if (existing) {
				return fail(409, { exists: true, message: 'Player by that name alaready exists' });
			}
			const players = await prisma.player.findMany();
			const newPlayer = await prisma.player.create({
				data: {
					name
				}
			});
			prisma.team
				.create({
					data: {
						color: '#' + genRanHex(6),
						name: createTeamName([newPlayer.name]),
						players: { connect: [{ id: newPlayer.id }] }
					}
				})
				.then();
			for (let i = 0; i < players.length; i++) {
				prisma.team
					.create({
						data: {
							color: '#' + genRanHex(6),
							name: createTeamName([newPlayer.name, players[i].name]),
							players: {
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
