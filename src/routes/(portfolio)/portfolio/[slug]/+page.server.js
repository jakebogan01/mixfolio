import { redirect } from '@sveltejs/kit';
import { DASHBOARD } from '$lib/utils/constants.js';

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ depends, locals: { supabase, user } }) => {
	depends('supabase:db:user_profile');

	const { data: user_profile, error } = await supabase
		.from('user_profile')
		.select('*, user_preferences(*)')
		.eq('user_id', user.id)
		.single();

	if (error) {
		console.dir(error, { depth: null });
		redirect(303, DASHBOARD);
	}

	return { user_profile: user_profile ?? {} };
};
