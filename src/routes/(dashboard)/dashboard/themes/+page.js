export const ssr = false;

import { processExpandedItems } from '$lib/utils/misc.js';

export async function load({ parent, depends }) {
	const { pb } = await parent();
	depends('user_profile');

	try {
		const themes = await pb.collection('themes').getFullList();
		let allThemes = themes;

		if (themes) allThemes = processExpandedItems(pb, themes, 'image', 'theme_image_url');

		return { themes: themes || [] };
	} catch (error) {
		console.dir(error?.message, { depth: null });
	}
	return { themes: [] };
}
