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
	save: async ({ request, fetch }) => {
		const data = await request.formData();
		const id = data.get('id') as string;
		const file = data.get('image') as File | null;
		try {
			if (file?.size) {
				const ext = file?.name.split('.').pop();
				const filename = nanoid() + '.' + ext;
				// const s3 = new S3({
				// 	region: 'eu-central-1',
				// 	credentials: { accessKeyId: AWS_AK, secretAccessKey: AWS_SK }
				// });
				// await s3
				// 	.putObject({
				// 		Bucket: BUCKET_NAME,
				// 		Key: filename,
				// 		ACL: 'public-read',
				// 		ContentType: file.type,
				// 		Body: Buffer.from(await file.arrayBuffer())
				// 	})
				// 	.promise();

				// const imageUri = 'https://izpo-fifa.s3.eu-central-1.amazonaws.com/' + filename;
				// await prisma.player.update({ where: { id: +id }, data: { imageUri } });
			}
		} catch (error) {
			console.log(error);
		}
		throw redirect(303, '/a/players');
	}
} satisfies Actions;
