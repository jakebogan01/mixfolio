export const ssr = false;

import { redirect } from '@sveltejs/kit';

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
					'expand.projects.collectionId, ' +
					'expand.projects.id, ' +
					'expand.projects.title, ' +
					'expand.projects.description, ' +
					'expand.projects.link, ' +
					'expand.projects.image, ' +
					'expand.projects.created, ' +
					'expand.testimonials.collectionId, ' +
					'expand.testimonials.id, ' +
					'expand.testimonials.name, ' +
					'expand.testimonials.email, ' +
					'expand.testimonials.role, ' +
					'expand.testimonials.avatar',
				expand: 'projects, testimonials'
			});

		userProfile.avatar_url = userProfile.avatar
			? pb.files.getURL(userProfile, userProfile.avatar)
			: null;

		for (const project of userProfile.expand?.projects || []) {
			project.project_image_url = project.image ? pb.files.getURL(project, project.image) : null;
			delete project.collectionId;
		}

		for (const testimonial of userProfile.expand?.testimonials || []) {
			testimonial.testimonial_image_url = testimonial.avatar
				? pb.files.getURL(testimonial, testimonial.avatar)
				: null;
			delete testimonial.collectionId;
		}

		delete userProfile.collectionId;
		if (userProfile.expand?.projects?.length) {
			userProfile.expand.projects.forEach((project) => {
				if ('collectionId' in project) delete project.collectionId;
			});
		}
		if (userProfile.expand?.testimonials?.length) {
			userProfile.expand.testimonials.forEach((testimonial) => {
				if ('collectionId' in testimonial) delete testimonial.collectionId;
			});
		}

		return { userProfile: userProfile || {} };
	} catch (error) {
		console.dir(error?.message, { depth: null });
	}
	return { userProfile: {} };
}
