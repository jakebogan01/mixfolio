import {
	CLIENTS,
	DASHBOARD,
	PROFILE,
	PROJECTS,
	TESTIMONIALS,
	THEMES
} from '$lib/utils/constants.js';

export const navLinks = [
	{
		id: 1,
		link: DASHBOARD,
		text: 'Dashboard',
		icon: 'home'
	},
	{
		id: 2,
		link: PROFILE,
		text: 'Profile',
		icon: 'profile'
	},
	{
		id: 3,
		link: PROJECTS,
		text: 'Projects',
		icon: 'projects'
	},
	{
		id: 4,
		link: CLIENTS,
		text: 'Clients',
		icon: 'clients'
	},
	{
		id: 5,
		link: TESTIMONIALS,
		text: 'Testimonials',
		icon: 'testimonials'
	},

	{
		id: 6,
		link: THEMES,
		text: 'Themes',
		icon: 'themes'
	}
];
