import { redirect } from '@sveltejs/kit';
<<<<<<< Updated upstream
=======
import { DASHBOARD } from '$lib/utils/constants.js';
import { createSuccessMessage } from '$lib/utils/cookieMessage.js';
>>>>>>> Stashed changes

export const actions = {
	login: async ({ request, cookies, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('email');
		const password = formData.get('password');

		const { error } = await supabase.auth.signInWithPassword({ email, password });
		if (error) {
			console.error(error);
			redirect(303, '/auth/error');
		} else {
<<<<<<< Updated upstream
			redirect(303, '/private');
=======
			createSuccessMessage(cookies, 'You have successfully logged in.');
			redirect(303, DASHBOARD);
>>>>>>> Stashed changes
		}
	}
};

