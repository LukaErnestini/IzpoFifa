import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ parent }) => {
	const data = await parent();
	const activeGame = data.activeGameday?.games.find((game) => !game.finished);
	if (activeGame) {
		throw redirect(302, 'game');
	}
	return { activeGame };
}) satisfies PageLoad;
