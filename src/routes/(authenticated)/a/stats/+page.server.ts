import { PUBLIC_DATA_API } from '$env/static/public';
import type { playerStats } from '$lib/types';
import type { Session } from '@supabase/supabase-js';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, locals }) => {
	const session = (await locals.getSession()) as Session;
	const userId = session.user.id;

	// fetch data from api
	try {
		const response = await fetch(PUBLIC_DATA_API + 'player-stats?userId=' + userId);
		const data: playerStats = await response.json();
		// console.log(data);
		return { ...data };
	} catch (err) {
		console.log(err);
		throw error(500, 'Something went wrong');
	}
};
