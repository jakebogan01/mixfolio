export const ssr = false;

import { PUBLIC_POCKETBASE_URL } from '$env/static/public';

import PocketBase from 'pocketbase';
import { user } from '$lib/stores/user.svelte.js';

const pb = new PocketBase(PUBLIC_POCKETBASE_URL);

if (typeof localStorage !== 'undefined') {
	const stored = localStorage.getItem('pocketbase_auth');
	if (stored) user.model = pb;
}

export default pb;
