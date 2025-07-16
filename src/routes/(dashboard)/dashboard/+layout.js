export const ssr = false;

/** @type {import('./$types').LayoutLoad} */

export async function load({ parent }) {
	const { pb } = await parent();

	try {
		const slug = await pb
			.collection('user_profile')
			.getFirstListItem(`user_id="${pb.authStore.record.id}"`);
		return { slug: slug || {} };
	} catch (error) {
		console.dir(error, { depth: null });
	}
	return { slug: {} };
}
