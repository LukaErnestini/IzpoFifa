import prisma from '$lib/prisma';
import type { Session } from '@supabase/supabase-js';
import { error, fail } from '@sveltejs/kit';

import type { Actions } from './$types';

export const actions: Actions = {
	// TODO define actions
	// attempt: async ({ request }) => {
	// 	const data = await request.formData();
	// 	const shooterId = data.get('shooter') ? +(data.get('shooter') as string) : undefined;
	// 	if (!shooterId) {
	// 		return fail(400, { error: 'A shooter must be selected.' });
	// 	}
	// 	let goal = data.get('goal') ? true : false;
	// 	const autogoal = data.get('autogoal') ? true : false;
	// 	const onTarget = data.get('onTarget') ? true : false;
	// 	const penalty = data.get('penalty') ? true : false;
	// 	const time = +(data.get('time') as string);
	// 	const x = data.get('x') ? +(data.get('x') as string) : null;
	// 	const y = data.get('y') ? +(data.get('y') as string) : null;
	// 	const distance = data.get('distance') ? +(data.get('distance') as string) : -1;
	// 	const assistedId = data.get('assisted') ? +(data.get('assisted') as string) : undefined;
	// 	const goalieId = data.get('goalie') ? +(data.get('goalie') as string) : undefined;
	// 	const gameId = data.get('gameId') ? +(data.get('gameId') as string) : undefined;
	// 	if (autogoal) goal = true;
	// 	try {
	// 		const attempt = await prisma.attempt.create({
	// 			data: {
	// 				goal,
	// 				autogoal,
	// 				onTarget: goal ? true : onTarget,
	// 				penalty,
	// 				time,
	// 				x,
	// 				y,
	// 				distance: distance > 0 ? distance : null,
	// 				shooter: { connect: { id: shooterId } },
	// 				assisted: assistedId ? { connect: { id: assistedId } } : undefined,
	// 				goalie: goalieId ? { connect: { id: goalieId } } : undefined,
	// 				Game: { connect: { id: gameId } }
	// 			}
	// 		});
	// 		await actions.tallyScore();
	// 	} catch (error) {
	// 		console.log(error);
	// 		fail(400, { error: 'An unexpected error occured.' });
	// 	}
	// },
};
