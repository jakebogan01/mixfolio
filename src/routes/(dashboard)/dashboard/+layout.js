export const ssr = false;

import { goto } from '$app/navigation';
import { redirect } from '@sveltejs/kit';
import { processExpandedItems } from '$lib/utils/misc.js';
import { user } from '$lib/stores/user.svelte.js';

export async function load({ parent, depends, fetch }) {
	const { pb } = await parent();
	depends('user_profile');

	if (!pb?.authStore?.isValid) redirect(303, '/');

	try {
		await pb.collection('users').authRefresh();
	} catch (error) {
		console.dir(error, { depth: null });
		user.model = null;
		pb.authStore.clear();
		await goto('/', { state: { type: 'error', message: 'Something went wrong.' } });
	}

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
					'oauth, ' +
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

		const res = await fetch(`/api/umami/${userProfile?.slug}`);
		if (!res.ok) {
			const { error } = await res.json();
			return {
				slug: userProfile?.slug,
				events: [],
				metrics: [],
				error
			};
		}

		let trackingData = await res.json();

		return {
			userProfile: userProfile || {},
			events: trackingData?.events || [],
			metrics: trackingData?.metrics || []
		};
	} catch (error) {
		console.dir(error?.message, { depth: null });
	}
	return { userProfile: {} };
}
