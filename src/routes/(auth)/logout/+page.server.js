import { redirect } from '@sveltejs/kit';
import { createSuccessMessage } from '$lib/utils/cookieMessage.js';

export async function load() {
	redirect(302, '/');
}

export const actions = {
	default: async ({ cookies, locals: { supabase } }) => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.dir(error, { depth: null });
			redirect(303, '/');
		}
		createSuccessMessage(cookies, 'You have successfully logged out.');
		redirect(303, '/');
	}
};
