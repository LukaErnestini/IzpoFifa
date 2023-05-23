import prisma from '$lib/prisma';
import { fail, redirect } from '@sveltejs/kit';
import { nanoid } from 'nanoid';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const id = +params.playerId;
	const player = await prisma.player.findFirst({ where: { id } });

	if (!player) {
		return fail(404, { error: 'Player not found' });
	}

	return { player };
}) satisfies PageServerLoad;

export const actions = {
	save: async ({ request, fetch, locals: { supabase } }) => {
		const data = await request.formData();
		const id = data.get('id') as string;
		const file = data.get('image') as File | null;

		try {
			if (file?.size) {
				const ext = file?.name.split('.').pop();
				const filename = nanoid() + '.' + ext;

				const { data, error } = await supabase.storage.from('avatars').upload(filename, file, {
					cacheControl: '3600',
					upsert: false
				});
				// console.log('Data: ', data);
				// console.log('Error: ', error);

				const imageUri = supabase.storage.from('avatars').getPublicUrl(filename).data.publicUrl;
				// console.log('Image URI: ', imageUri);

				await prisma.player.update({ where: { id: +id }, data: { imageUri } });
			}
		} catch (error) {
			console.log(error);
		}
		throw redirect(303, '/a/players');
	}
} satisfies Actions;
