import { readSuccessMessage } from '$lib/utils/cookieMessage.js';

export const load = async ({ depends, cookies, locals: { supabase, user } }) => {
	depends('supabase:db:notes');
	const { data: notes } = await supabase.from('notes').select('id,note').order('id');
	const successMessage = readSuccessMessage(cookies);

	return { successMessage, user, notes: notes ?? [] };
};
