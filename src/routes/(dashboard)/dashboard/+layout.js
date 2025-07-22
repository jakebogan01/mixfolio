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
		if (userProfile?.avatar) {
			let avatar_url = pb.files.getURL(userProfile, userProfile?.avatar);
			if (avatar_url) userProfile.avatar_url = avatar_url;
		}
		if (userProfile?.expand?.projects) {
			userProfile?.expand?.projects.forEach((item) => {
				if (item?.image) {
					let project_image_url = pb.files.getURL(item, item.image);
					if (project_image_url) item.project_image_url = project_image_url;
				}
			});
		}
		if (userProfile?.expand?.testimonials) {
			userProfile?.expand?.testimonials.forEach((item) => {
				if (item?.avatar) {
					let testimonial_image_url = pb.files.getURL(item, item.avatar);
					if (testimonial_image_url) item.testimonial_image_url = testimonial_image_url;
				}
			});
		}
		delete userProfile.collectionId;
		userProfile.expand.projects.forEach((project) => delete project.collectionId);
		userProfile.expand.testimonials.forEach((testimonial) => delete testimonial.collectionId);

		return { userProfile: userProfile || {} };
	} catch (error) {
		console.dir(error?.message, { depth: null });
	}
	return { userProfile: {} };
}
