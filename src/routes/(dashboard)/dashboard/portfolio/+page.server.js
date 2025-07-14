import { superValidate, fail } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { z } from 'zod/v4';

const schema = z.object({
	avatar: z
		.file()
		.max(50_000_000, 'File cannot surpass 50 MB')
		.mime(['image/png', 'image/jpeg', 'image/jpg'], 'Only png, jpg, and jpeg files only')
		.optional(),
	name: z.string().min(1, 'The name field cannot be empty').trim(),
	phone: z.string().min(1, 'The phone field cannot be empty').trim(),
	email: z.email('The email field cannot be empty').trim(),
	role: z.string().min(1, 'The role field cannot be empty').trim(),
	address: z.string().min(1, 'The address field cannot be empty').trim(),
	slug: z.string().min(1, 'The url field cannot be empty').trim(),
	bio: z.string().min(1, 'The bio field cannot be empty').trim()
});

export const load = async ({ depends, locals: { supabase, user } }) => {
	depends('supabase:db:user_profile');
	const { data: user_profile, error } = await supabase
		.from('user_profile')
		.select('*, user_preferences(*)')
		.eq('user_id', user.id)
		.single();
	if (error) {
		console.dir(error, { depth: null });
	}
	if (user_profile) {
		if (user_profile.avatar_url) {
			const { data: bucketData, error: bucketError } = supabase.storage
				.from('mixfolio')
				.getPublicUrl(user_profile?.avatar_url);
			if (bucketError) {
				console.dir(bucketError, { depth: null });
			}
			user_profile.avatar_url = bucketData?.publicUrl;
		}
	}
	return { user_profile: user_profile ?? {} };
};

export const actions = {
	create: async ({ request, locals: { supabase, user } }) => {
		const requestFormData = await superValidate(request, zod4(schema));
		if (!requestFormData.valid) {
			return fail(400, { requestFormData });
		}

		const { slug, avatar, ...rest } = requestFormData.data;
		requestFormData.data = rest;
		requestFormData.data.user_id = user?.id;
		if (avatar !== undefined || avatar !== null) {
			const fileExt = avatar.name.split('.').pop();
			const filePath = `avatars/${crypto.randomUUID()}.${fileExt}`;
			requestFormData.data.avatar_url = filePath;
			const { error } = await supabase.storage.from('mixfolio').upload(filePath, avatar, {
				cacheControl: '3600',
				upsert: false
			});
			if (error) console.error('Bucket error:', error);
		}
		const { data: profileData, error: profileError } = await supabase
			.from('user_profile')
			.insert(requestFormData?.data)
			.select()
			.single();
		const preferenceData = {
			profile_id: profileData?.user_id,
			slug: slug
		};
		const { error: preferencesError } = await supabase
			.from('user_preferences')
			.insert(preferenceData);
		if (profileError || preferencesError) {
			console.dir(profileError || preferencesError, { depth: null });
			return { error: 'Error occurred.' };
		} else {
			return { success: 'Form successfully submitted.' };
		}
	},
	delete: async ({ request, locals: { supabase } }) => {
		const data = await request.formData();
		const user_preferences_id = data.get('user_preferences_id');
		const user_profile_id = data.get('user_profile_id');

		const response1 = await supabase
			.from('user_preferences')
			.delete()
			.eq('id', user_preferences_id);

		const response2 = await supabase.from('user_profile').delete().eq('id', user_profile_id);

		if (response1.error || response2.error) {
			console.log(response1.error);
			console.log(response2.error);
		}
	}
};
