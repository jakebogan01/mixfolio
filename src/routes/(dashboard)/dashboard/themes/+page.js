export const ssr = false;

import { processExpandedItems } from '$lib/utils/misc.js';

export async function load({ parent }) {
	const { pb } = await parent();

	try {
		const themes = await pb.collection('themes').getFullList();
		let allThemes;
		if (themes) allThemes = processExpandedItems(pb, themes, 'image', 'theme_image_url');
		return { themes: allThemes || [] };
	} catch (error) {
		console.dir(error?.message, { depth: null });
	}
	return { themes: [] };
}
