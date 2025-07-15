export const ssr = false;

export async function load({ parent, fetch }) {
	const { pb } = await parent();

	// Replace internal fetch with SvelteKit's
	pb.send = async (url, options = {}) => {
		const res = await fetch(pb.baseUrl + url, options);
		if (!res.ok) throw new Error(await res.text());
		return res.json();
	};

	const record = await pb
		.collection('user_profile')
		.getFirstListItem(`user_id="${pb.authStore.record.id}"`);
	return { record };
}
