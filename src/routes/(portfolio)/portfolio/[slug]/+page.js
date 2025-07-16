export const ssr = false;

export async function load({ parent, depends, params }) {
	const { pb } = await parent();
	depends('user_profile');

	try {
		const record = await pb.collection('user_profile').getFirstListItem(`slug="${params.slug}"`);
		let avatar_url = pb.files.getUrl(record, record.avatar);
		if (avatar_url) record.avatar_url = avatar_url;
		return { record: record || {} };
	} catch (error) {
		console.dir(error, { depth: null });
	}
	return { record: {} };
}
