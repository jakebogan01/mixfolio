import PocketBase from 'pocketbase';
import { json } from '@sveltejs/kit';
import { PB_SUPERUSER_PASSWORD, PB_SUPERUSER_EMAIL } from '$env/static/private';
import { PUBLIC_POCKETBASE_URL } from '$env/static/public';

const PB_URL = PUBLIC_POCKETBASE_URL;

export async function POST({ request }) {
	try {
		const body = await request.json();
		const { userId, password, passwordConfirm } = body;

		if (!userId || !password || !passwordConfirm) {
			return json({ error: 'Missing required fields.' }, { status: 400 });
		}

		// Log in as PocketBase super admin
		const pb = new PocketBase(PB_URL);
		await pb.admins.authWithPassword(PB_SUPERUSER_EMAIL, PB_SUPERUSER_PASSWORD);

		// Update user password using admin privileges
		const updatedUser = await pb
			.collection('users')
			.update(userId, { password: password, passwordConfirm: passwordConfirm });

		return json({ success: true, user: updatedUser });
	} catch (error) {
		console.dir(error, { depth: null });
		return json({ error: error.message || 'Something went wrong.' }, { status: 500 });
	}
}
