import { z } from 'zod';
import { superValidate, fail } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { redirect } from '@sveltejs/kit';

const schema = z.object({ bio: z.string().min(1, 'This field cannot be empty').trim() });

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ depends, locals: { supabase } }) => {
	depends('supabase:db:user_profile');
	const { data: user_profile } = await supabase
		.from('user_profile')
		.select('id,bio,created_at')
		.order('id');
	return { user_profile: user_profile ?? [] };
};

/** @satisfies {import('./$types').Actions} */
export const actions = {
	default: async ({ request, locals: { supabase, user } }) => {
		const requestFormData = await superValidate(request, zod(schema));
		if (!requestFormData.valid) {
			return fail(400, { requestFormData });
		}
		const { error } = await supabase
			.from('user_profile')
			.insert({ user_id: user?.id, bio: requestFormData?.data?.bio || null });
		if (error) {
			console.dir(error, { depth: null });
			redirect(303, '/dashboard');
		}
	}
};
