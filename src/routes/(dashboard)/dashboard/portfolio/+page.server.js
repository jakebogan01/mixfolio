import { z } from 'zod';
import { superValidate, fail } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { redirect } from '@sveltejs/kit';

const schema = z.object({ about: z.string().min(5).trim() });

export const actions = {
	about: async ({ request, locals: { supabase, user } }) => {
		const requestFormData = await superValidate(request, zod(schema));
		if (!requestFormData.valid) {
			return fail(400, { requestFormData });
		}

		const { error } = await supabase
			.from('posts')
			.insert({ user_id: user?.id, about: requestFormData?.data?.about });
		if (error) {
			console.dir(error, { depth: null });
			redirect(303, '/dashboard');
		}
	}
};
