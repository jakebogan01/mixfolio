export const ssr = false;

import { redirect } from '@sveltejs/kit';

export async function load({ parent }) {
	const { pb } = await parent();
	// Redirect to home if user is not authenticated
	if (!pb.authStore.isValid) {
		redirect(303, '/');
	}

	// You can also fetch user-related data here
	return {
		user: pb.authStore.model.record || {}
	};
}
