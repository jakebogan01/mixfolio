import { redirect } from '@sveltejs/kit';

export const actions = {
	about: async ({ request, locals: { supabase, user } }) => {
		const formData = await request.formData();
		const about = formData.get('about');

		const { error } = await supabase.from('posts').insert({ user_id: user?.id, about: about });
		if (error) {
			console.error(error);
			redirect(303, '/dashboard');
		}
	}
};
