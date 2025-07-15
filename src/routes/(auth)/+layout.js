export const ssr = false;

import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').LayoutLoad} */
export async function load({ parent, url }) {
	const { pb } = await parent();
	if (pb.authStore.isValid && (url.pathname === '/register' || url.pathname === '/login')) {
		redirect(303, '/');
	}
}
