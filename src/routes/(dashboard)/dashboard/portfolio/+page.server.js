import { superValidate, fail } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { z } from 'zod/v4';

const schema = z.object({
	name: z.string().min(1, 'The name field cannot be empty').trim(),
	phone: z.string().min(1, 'The phone field cannot be empty').trim(),
	email: z.email('The email field cannot be empty').trim(),
	role: z.string().min(1, 'The role field cannot be empty').trim(),
	address: z.string().min(1, 'The address field cannot be empty').trim(),
	bio: z.string().min(1, 'The bio field cannot be empty').trim()
});

export const load = async ({ depends, locals: { supabase } }) => {
	depends('supabase:db:user_profile');
	const { data: user_profile } = await supabase.from('user_profile').select().order('id');
	return { user_profile: user_profile ?? [] };
};

export const actions = {
	default: async ({ request, locals: { supabase, user } }) => {
		const requestFormData = await superValidate(request, zod4(schema));
		if (!requestFormData.valid) {
			return fail(400, { requestFormData });
		}
		requestFormData.data.user_id = user?.id;
		const { error } = await supabase.from('user_profile').insert(requestFormData?.data);
		if (error) {
			console.dir(error, { depth: null });
			return { error: 'Error occurred.' };
		} else {
			return { success: 'Form successfully submitted.' };
		}
	}
};
