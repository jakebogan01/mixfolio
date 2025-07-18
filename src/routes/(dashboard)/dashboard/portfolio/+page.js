export const ssr = false;

export async function load({ parent, depends }) {
	const { pb } = await parent();
	depends('user_profile');
	depends('projects');

	try {
		const record = await pb.collection('user_profile').getFirstListItem(`user_id="${pb.authStore.record.id}"`,
			{
				fields: "id,slug,avatar,name,email,phone,address,bio, expand.projects",
				expand: "projects"
			});
		console.log('BACKEND RECORD OF PROJECTS', record)
		if (!record) return { record: {} };
		let avatar_url = pb.files.getUrl(record, record.avatar);
		if (avatar_url) record.avatar_url = avatar_url;
		return { record: record || {} };
	} catch (error) {
		console.dir(error, { depth: null });
	}
	return { record: {} };
}
