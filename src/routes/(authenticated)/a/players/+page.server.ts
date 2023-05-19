import prisma from '$lib/prisma';
import type { Session } from '@supabase/supabase-js';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const players = await prisma.player.findMany();
	return { players };
}) satisfies PageServerLoad;

export const actions = {
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

			if (!player) {
				return fail(401, { message: 'Unauthorized' });
			}

			// Delete should cascade to all associated teams and games
			// https://www.prisma.io/docs/concepts/components/prisma-schema/relations/referential-actions#referential-action-defaults
			await prisma.player.delete({
				where: { id: +id }
			});
		} catch (error) {
			console.log(error);
			return fail(500, { message: 'Something went wrong' });
		}

		return { success: true };
	}
};
