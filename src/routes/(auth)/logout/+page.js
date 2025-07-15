export const ssr = false;

import { goto, invalidateAll } from '$app/navigation';
import { user } from '$lib/stores/user.svelte.js';

export async function load({ parent }) {
	const { pb } = await parent();
	user.model = null;
	pb.authStore.clear();
	await goto('/', { state: { message: 'Successfully logged out' } });
	await invalidateAll();
}
