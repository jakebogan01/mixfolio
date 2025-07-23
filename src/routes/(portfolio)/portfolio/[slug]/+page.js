export const ssr = false;

export async function load({ parent, params }) {
	const { pb } = await parent();

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
				'avatar, ' +
				'created, ' +
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
				'expand.testimonials.avatar, ' +
				'expand.clients.collectionId, ' +
				'expand.clients.id, ' +
				'expand.clients.name, ' +
				'expand.clients.link, ' +
				'expand.clients.image,'+
				'expand.preferences.id,' +
				'expand.preferences.portfolio_color',
			expand: 'projects, testimonials, clients, preferences'
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
		delete userProfile.collectionId;
		userProfile.expand.projects.forEach((project) => delete project.collectionId);

		return { userProfile: userProfile || {} };
	} catch (error) {
		console.dir(error?.message, { depth: null });
	}
	return { userProfile: {} };
}
