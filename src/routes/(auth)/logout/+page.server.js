import { redirect } from '@sveltejs/kit';

export async function load() {
	redirect(302, '/');
}

export const actions = {
	default: async ({ locals: { supabase } }) => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.dir(error, { depth: null });
			redirect(303, '/');
		}
		redirect(303, '/');
	}
};
