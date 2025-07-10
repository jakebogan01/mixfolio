/** @type {import('./$types').PageServerLoad} */
export const load = async ({ depends, locals: { supabase } }) => {
	depends('supabase:db:user_profile');
	const { data: user_profile } = await supabase
		.from('user_profile')
		.select('id,bio,created_at')
		.order('id');
	return { user_profile: user_profile ?? [] };
};
