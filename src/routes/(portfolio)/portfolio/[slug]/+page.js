export const ssr = false;

export async function load({ parent, depends }) {
	const { pb } = await parent();
	depends('user_profile');

	try {
		const record = await pb
			.collection('user_profile')
			.getFirstListItem(`user_id="${pb.authStore.record.id}"`);
		return { record: record || {} };
	} catch (error) {
		console.dir(error, { depth: null });
	}
	return { record: {} };
}
