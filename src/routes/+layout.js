export const ssr = false;

import pb from '$lib/pocketbase';
import { user } from '$lib/stores/user.svelte.js';

/** @type {import('./$types').LayoutLoad} */
export function load() {
	return {
		pb: user.model !== null ? user.model : pb
	};
}
