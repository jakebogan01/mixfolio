export const ssr = false;

import { redirect } from '@sveltejs/kit';
import { processExpandedItems } from '$lib/utils/misc.js';

export async function load({ parent, depends }) {
	const { pb } = await parent();
	depends('user_profile');

	if (!pb?.authStore?.isValid) redirect(303, '/');

	try {
		const userProfile = await pb
			.collection('profiles')
			.getFirstListItem(`user_id="${pb?.authStore?.record?.id}"`, {
				fields:
					'collectionId, ' +
					'id, ' +
					'name, ' +
					'email, ' +
					'phone, ' +
					'address, ' +
					'role, ' +
					'biography, ' +
					'slug, ' +
					'avatar, ' +
					'created, ' +
					'expand.projects.collectionId, ' +
					'expand.projects.id, ' +
					'expand.projects.title, ' +
					'expand.projects.description, ' +
					'expand.projects.link, ' +
					'expand.projects.image, ' +
					'expand.projects.created, ' +
					'expand.projects.updated, ' +
					'expand.testimonials.collectionId, ' +
					'expand.testimonials.id, ' +
					'expand.testimonials.name, ' +
					'expand.testimonials.email, ' +
					'expand.testimonials.role, ' +
					'expand.testimonials.avatar, ' +
					'expand.clients.collectionId, ' +
					'expand.clients.id, ' +
					'expand.clients.name, ' +
					'expand.clients.link, ' +
					'expand.clients.image, ' +
					'expand.preferences.id, ' +
					'expand.preferences.portfolio_color ' +
					'expand.preferences.hide_projects ' +
					'expand.preferences.hide_testimonials ' +
					'expand.preferences.hide_clients ' +
					'expand.preferences.hide_portfolio ' +
					'expand.preferences.hide_notifications ' +
					'expand.preferences.hide_analytics ',
				expand: 'projects, testimonials, clients, preferences'
			});

		userProfile.avatar_url = userProfile.avatar
			? pb.files.getURL(userProfile, userProfile.avatar)
			: null;

		if (userProfile.expand?.projects)
			userProfile.expand.projects = processExpandedItems(
				pb,
				userProfile.expand.projects,
				'image',
				'project_image_url'
			);

		if (userProfile.expand?.testimonials)
			userProfile.expand.testimonials = processExpandedItems(
				pb,
				userProfile.expand.testimonials,
				'avatar',
				'testimonial_image_url'
			);

		if (userProfile.expand?.clients)
			userProfile.expand.clients = processExpandedItems(
				pb,
				userProfile.expand.clients,
				'image',
				'client_image_url'
			);

		if ('collectionId' in userProfile) delete userProfile.collectionId;

		return { userProfile: userProfile || {} };
	} catch (error) {
		console.dir(error?.message, { depth: null });
	}
	return { userProfile: {} };
}
