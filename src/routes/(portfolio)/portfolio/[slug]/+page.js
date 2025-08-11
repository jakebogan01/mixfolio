import { processExpandedItems } from '$lib/utils/misc.js';
import { error } from '@sveltejs/kit';

export const ssr = false;

export async function load({ parent, params }) {
	const { pb } = await parent();

	try {
		await pb.collection('profiles').getFirstListItem(`slug="${params?.slug}"`, {
			fields: 'slug'
		});
	} catch (error) {
		console.dir(error?.message, { depth: null });
		error(404, 'Not found');
	}

	try {
		const userProfile = await pb.collection('profiles').getFirstListItem(`slug="${params?.slug}"`, {
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
				'oauth, ' +
				'avatar, ' +
				'resume, ' +
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
				'expand.testimonials.quote, ' +
				'expand.testimonials.role, ' +
				'expand.testimonials.company, ' +
				'expand.testimonials.avatar, ' +
				'expand.clients.collectionId, ' +
				'expand.clients.id, ' +
				'expand.clients.name, ' +
				'expand.clients.link, ' +
				'expand.clients.image, ' +
				'expand.preferences.id, ' +
				'expand.preferences.portfolio_color, ' +
				'expand.preferences.hide_projects, ' +
				'expand.preferences.hide_testimonials, ' +
				'expand.preferences.hide_clients, ' +
				'expand.preferences.hide_portfolio, ' +
				'expand.preferences.hide_notifications, ' +
				'expand.preferences.hide_analytics, ' +
				'expand.preferences.theme_id',
			expand: 'projects, testimonials, clients, preferences'
		});

		userProfile.avatar_url = userProfile.avatar
			? pb.files.getURL(userProfile, userProfile.avatar)
			: null;

		userProfile.resume_url = userProfile.resume
			? pb.files.getURL(userProfile, userProfile.resume)
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

		let portfolioPublic = userProfile?.expand?.preferences?.hide_portfolio;
		// console.log('User profile:', userProfile);

		if (!portfolioPublic) {
			console.log('Public portfolio:', portfolioPublic);
			error(404, 'Not found');
		}
		return { userProfile: userProfile || {} };
	} catch (err) {
		console.dir(err?.message, { depth: null });
		error(404, 'Not found');
	}
	// return { userProfile: {} };
}
