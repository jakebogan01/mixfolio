import { z } from 'zod';
import { superValidate, fail } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { redirect } from '@sveltejs/kit';
import { createSuccessMessage, readSuccessMessage } from '$lib/utils/cookieMessage.js';

const schema = z.object({ about: z.string().min(5).trim() });

<<<<<<< Updated upstream
export const actions = {
	about: async ({ request, locals: { supabase, user } }) => {
=======
/** @type {import('./$types').PageServerLoad} */
export const load = async ({ depends, cookies, locals: { supabase } }) => {
	depends('supabase:db:user_profile');
	const successMessage = readSuccessMessage(cookies);

	const { data: user_profile } = await supabase
		.from('user_profile')
		.select('id,bio,created_at')
		.order('id');
	return { successMessage,user_profile: user_profile ?? [] };
};

/** @satisfies {import('./$types').Actions} */
export const actions = {
	default: async ({ request, cookies, locals: { supabase, user } }) => {
>>>>>>> Stashed changes
		const requestFormData = await superValidate(request, zod(schema));
		if (!requestFormData.valid) {
			return fail(400, { requestFormData });
		}

		const { error } = await supabase
			.from('posts')
			.insert({ user_id: user?.id, about: requestFormData?.data?.about });
		if (error) {
			console.dir(error, { depth: null });
			createSuccessMessage(cookies, 'Bio updated successfully.');
			redirect(303, '/dashboard');
		}
	}
};
