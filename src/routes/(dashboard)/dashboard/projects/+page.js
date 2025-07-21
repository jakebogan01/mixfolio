export const ssr = false;

export async function load({ parent, depends }) {
	const { pb } = await parent();
	depends('projects');

	try {
		const record = await pb
			.collection('user_profile')
			.getFirstListItem(`user_id="${pb.authStore.record.id}"`, {
				fields: 'id,slug,avatar,name,email,phone,address,bio, expand.projects',
				expand: 'projects'
			});
		if (!record) return { record: {} };
		let avatar_url = pb.files.getURL(record, record.avatar);
		if (avatar_url) record.avatar_url = avatar_url;
		return { record: record || {} };
	} catch (error) {
		console.dir(error, { depth: null });
	}
	return { record: {} };
}
