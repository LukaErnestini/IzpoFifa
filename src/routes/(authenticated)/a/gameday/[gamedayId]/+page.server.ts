import { PUBLIC_DATA_API } from '$env/static/public';
import prisma from '$lib/prisma';
import type { playerStats } from '$lib/types';
import type { Session } from '@supabase/supabase-js';
import { error, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, locals, params }) => {
	const session = (await locals.getSession()) as Session;
	const userId = session.user.id;
	const gamedayId = params.gamedayId;

	try {
		const response = await fetch(
			PUBLIC_DATA_API + 'player-stats?userId=' + userId + '&gamedayId=' + gamedayId
		);
		if (!response.ok) {
			throw error(response.status, 'Something went wrong');
		}
		const data: playerStats = await response.json();
		return { ...data };
	} catch (err) {
		console.log(err);
		throw error(500, 'Something went wrong');
	}
};

export const actions: Actions = {
	rename: async ({ request, params }) => {
		const gamedayId = +(params.gamedayId as string);

		const data = await request.formData();
		const title = data.get('title')?.toString();

		try {
			const gameday = await prisma.gameday.update({
				where: { id: gamedayId },
				data: { title }
			});
		} catch (err) {
			console.log(err);
			throw error(500, 'Something went wrong');
		}
	}
};
